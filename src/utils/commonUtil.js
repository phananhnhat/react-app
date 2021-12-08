import _ from 'lodash';

import { API, API_FLAG, USER_ROLES } from './constants';
import {
  stringToNumberDefault,
  isNullOrEmpty,
  isNullOrUndefinedOrEmptyStr,
  replaceAll,
} from './stringUtil';
import SessionStorageService from '../services/utilities/SessionStorageService';
import parts from '@standard-software/parts';
import LocalStorageService from '../services/utilities/LocalStorageService';
import { isTargetRoleId } from '../utilities/roleUtility';

/**
 * フラグ判定
 *  isApiFlagOff
 *  isApiFlagOn
 *    1 or 0 の場合に True False を返す
 */
export const isApiFlagOff = value => {
  const flag = _.isString(value) ? stringToNumberDefault(value) : value;
  if (!_.isNumber(flag)) {
    return false;
  }
  return flag === API_FLAG.Off;
};

export const isApiFlagOn = value => {
  const flag = _.isString(value) ? stringToNumberDefault(value) : value;
  if (!_.isNumber(flag)) {
    return false;
  }
  return flag === API_FLAG.On;
};

/**
 * @description 変換前の値とチェック値が一致した場合、デフォルト値に変換
 * @param {*} value 変換前の値
 * @param {array} checkValues チェック値
 * @param {*} defaultValue デフォルト値
 * @return {*} 一致: デフォルト値, 不一致: 変換前の値
 */
export const matchDefaultTo = (value, checkValues, defaultValue) => {
  if (!_.isArray(checkValues)) {
    throw new Error('checkValues not array.');
  }

  const isConversion = _.some(checkValues, checkValue => checkValue === value);
  return isConversion ? defaultValue : value;
};

/**
 * 端末判定
 *  isIPad
 *    iPadなら True を返す
 */
export const isIPad = () => {
  return (
    navigator.userAgent.indexOf('iPad') > -1 ||
    document.ontouchstart !== undefined
  );
};

/**
 * @description blob形式をjson形式に変換
 * @param {*} blob blob形式
 * @return {*} json形式 ※json形式への変換が失敗した場合は、blob形式を返却
 */
export const blobToJsonConversion = async blob => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject();
    };

    fileReader.onload = () => {
      let response;
      try {
        response = JSON.parse(fileReader.result);
      } catch (e) {
        response = fileReader.result;
      }
      resolve(response);
    };
    fileReader.readAsText(blob);
  });
};

/**
 * @description CSVダウンロード
 * @param {string} apiPath APIパス
 * @param {object} params 絞り込みパラメータ
 * @param {string} method GET or POST
 */
export const csvDownloader = (apiPath, params = {}, method = 'GET') => {
  const token = SessionStorageService.getToken();
  params.csv_token = token;
  apiPath = `${API.endpoint}/${apiPath}`;

  if (method === 'GET') {
    let queryParams = '?';
    _.each(params, (value, key) => {
      if (!isNullOrEmpty(value)) {
        if (!_.isArray(value)) {
          queryParams += `${key}=${value}&`;
        } else {
          _.each(value, item => {
            queryParams += `${key}[]=${item}&`;
          });
        }
      }
    });
    queryParams = queryParams.slice(0, -1);

    window.location.href = `${apiPath}${queryParams}`;
  } else {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = apiPath;
    form.enctype = 'application/x-www-form-urlencoded';
    let paramElement;

    _.each(params, (value, key) => {
      if (!isNullOrEmpty(value)) {
        paramElement = document.createElement('input');
        if (!_.isArray(value)) {
          paramElement.type = 'hidden';
          paramElement.name = key;
          paramElement.value = value;
          form.appendChild(paramElement);
        } else {
          _.each(value, item => {
            paramElement.type = 'hidden';
            paramElement.name = `${key}[]`;
            paramElement.value = item;
            form.appendChild(paramElement);
            paramElement = document.createElement('input');
          });
        }
      }
    });

    document.body.appendChild(form);
    form.submit();
  }
};

/**
 * @description タイマー
 * @param {number} millisecond: ミリ秒
 * @return Promise
 */
export const setWaitTime = millisecond => {
  return new Promise(resolve => {
    const waitTimer = setTimeout(function() {
      resolve();
      clearTimeout(waitTimer);
    }, millisecond);
  });
};

/**
 * @description APIレスポンスからエラーメッセージを抽出する
 * @param {object} response: APIレスポンス
 * @return {string} message: エラーメッセージ
 */
export const extractErrorMessage = response => {
  if (isNullOrUndefinedOrEmptyStr(response.message) === true) {
    if (
      isNullOrUndefinedOrEmptyStr(response.data) === false &&
      typeof response.data.message === 'string'
    ) {
      return response.data.message;
    } else if (
      isNullOrUndefinedOrEmptyStr(response.data.error) === false &&
      typeof response.data.error === 'string'
    ) {
      return response.data.error;
    }
  }

  return response.message;
};

/**
 * プロパティの存在確認とプロパティ個数の確定、hasOwnプロパティ限定
 * @param {*} object 対象オブジェクト
 * @param {*} propertyPaths プロパティ名をカンマ区切りで指定した文字列
 */
export const checkProperty = (object, propertyPaths) => {
  if (!parts.inProperty(object, propertyPaths)) {
    return false;
  }
  if (parts.propertyCount(object) !== propertyPaths.split(',').length) {
    return false;
  }
  return true;
};

export const fixProperty = (object, propertyPaths) => {
  const paths = replaceAll(propertyPaths, ' ', '').split(',');
  const result = paths.every(path => _.has(object, path));
  if (!result) {
    return false;
  }
  return _.size(object) === paths.length;
};

/**
 * @description 非同期リクエストを連続実行を防止して呼び出す。API固有の処理はないがAPI呼び出し専用で使う。
 * @param {Function} asyncF: 非同期メソッド
 * @return {Function} 連続実行を防止した非同期メソッド
 * @example
 * submit = onceAsyncRequest(async () => {
 *  await request(); //必ず非同期メソッドはawaitすること
 * });
 */
export const onceAsyncRequest = asyncF => {
  let isWaiting = false;

  return async function(...args) {
    // 待機中なので何もしない
    if (isWaiting) {
      return;
    }

    isWaiting = true;
    const result = await asyncF.apply(this, args);
    isWaiting = false;
    return result;
  };
};

/**
 * 労務安全システムから、調整会議システムが呼び出された場合の
 * 戻り先のURLを作成する処理
 * @param {*} domainUrl
 * @param {*} queryParameter
 */
export const getGreenFileSystemUrl = (domainUrl, queryParameter) => {
  if (queryParameter === '') {
    return;
  }
  // '?'がない場合や、'?'以降がない場合は queryParam は空文字になるので
  // 処理を行わない

  // クエリパラメータをオブジェクトにセット
  const formatQueryParams = {};
  _.each(queryParameter.split('&'), param => {
    const [key, value] = param.split('=');
    if (!_.isUndefined(key) && !_.isUndefined(value)) {
      formatQueryParams[key] = value;
    } else if (!_.isUndefined(key)) {
      formatQueryParams[key] = undefined;
    }
  });

  if (
    !_.has(formatQueryParams, '__sender') ||
    !_.has(formatQueryParams, '__callback')
  ) {
    return;
  }
  // __sender や __callback がない場合は処理を行わない

  if (formatQueryParams.__sender !== 'greenfile') {
    return;
  }
  // __sender が greenfile ではない場合は処理を行わない

  if (_.isUndefined(formatQueryParams.__callback)) {
    return;
  }
  // __callback が存在しない場合は処理を行わない
  // ※  __callback=&param1=abc なら空文字として存在するが
  //     __callback&param1=abc なら存在しないとみなされる

  delete formatQueryParams.__sender;
  const action = formatQueryParams.__callback;
  delete formatQueryParams.__callback;

  let greenFileSystemUrl = `${domainUrl}?_sender=conference&__action=${action}`;
  _.each(formatQueryParams, (value, key) => {
    if (!_.isUndefined(value)) {
      greenFileSystemUrl += `&${key}=${value}`;
    } else {
      greenFileSystemUrl += `&${key}`;
    }
  });

  return greenFileSystemUrl;
};

/**
 * YYYY/MM/DD 形式のデータかどうかを確認する
 */
export const matchFormatDateSlash = value => {
  if (!_.isString(value)) {
    return false;
  }
  return value.match(/^\d{1,4}\/\d{1,2}\/\d{1,2}$/) ? true : false;
};

/**
 * YYYY-MM-DD 形式のデータかどうかを確認する
 */
export const matchFormatDateHyphen = value => {
  if (!_.isString(value)) {
    return false;
  }
  return value.match(/^\d{1,4}-\d{1,2}-\d{1,2}$/) ? true : false;
};

/**
 * 999-9999 形式のデータかどうかを確認する
 */
export const matchFormatPostalCodeHyphen = value => {
  if (!_.isString(value)) {
    return false;
  }
  return value.match(/^\d{3}-\d{4}$/) ? true : false;
};

/**
 * 会社IDを取得する
 * 協力会社管理者は複数の会社に所属し得るため、SessionStorageに格納された元請け選択画面で選択した会社IDを利用する必要がある
 * それ以外のロールの場合はLoacalStorageに格納された会社IDを取得する
 * */
export const getCompanyId = () => {
  let companyId = 0;
  if (isTargetRoleId([USER_ROLES.partner], LocalStorageService.getRoleId())) {
    // 協力会社管理者の場合はsessionから取得
    companyId = SessionStorageService.getSessionPartnerCompanyIdOfPrimeCompany();
  } else {
    companyId = LocalStorageService.getCompanyId();
  }
  return companyId;
};

export const checkCallBackGreenFileService = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const url = LocalStorageService.getItem('url');
  return Number(_.defaultTo(params.__switch_user, 0)) === 1 && url;
};
