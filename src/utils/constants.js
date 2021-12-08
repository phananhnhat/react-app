import _ from 'lodash';

if (_.isUndefined(window.location.origin)) {
  if (_.isUndefined(window.location.host)) {
    window.location.origin = 'https://buildee.jp';
  } else {
    window.location.origin = `${window.location.protocol}//${
      window.location.host
    }`;
  }
  console.log('origin:', window.location.origin);
}

export const API = {
  /* eslint-disable no-undef */
  endpoint: process.env.REACT_APP_API_URL
    ? _.trimEnd(process.env.REACT_APP_API_URL, '/')
    : `${window.location.origin}/applications`,
  signalr: process.env.REACT_APP_SIGNALR_URL
    ? _.trimEnd(process.env.REACT_APP_SIGNALR_URL, '/')
    : `${window.location.origin}/socket`,
  nfs: process.env.REACT_APP_NFS_URL
    ? _.trimEnd(process.env.REACT_APP_NFS_URL, '/')
    : window.location.origin,
  authEndpoint: process.env.REACT_APP_AUTH_URL
    ? _.trimEnd(process.env.REACT_APP_AUTH_URL, '/')
    : 'http://localhost:5000',
  // window.location.origin はローカル環境なら http://localhost:3000 になる

  // .env ファイルに指定する URL は最後に / の有無関係なく読み込めて
  // API. で示される各定数の最後には最後に / はつかない

  /* eslint-enable no-undef */
};

// 揚重機利用
export const FLAG_STAUS = {
  negative: { id: 0, name: '無' },
  positive: { id: 1, name: '有' },
};

// login error catch retry limit
export const AUTH_VALIDATION_RETRY_COUNT_NUM = 5;

// 認証基盤設定
export const OIDC_SETTINGS = {
  authority: `${API.authEndpoint}/auth/`,
  client_id: 'buildee.v2.spa',
  redirect_uri: `${window.location.origin}/callback`,

  post_logout_redirect_uri: `${window.location.origin}`,
  // ログアウト処理に関して
  // post_logout_redirect_uri この値は
  // compose\V2All\docker-compose.yml
  // 上記ファイル内の
  // AuthServerSettings__Clients__buildee_v2_spa__PostLogoutRedirectUris__X
  // 複数指定したるURLのいずれかと一致させておく必要がある様子

  response_type: 'id_token token',
  scope: 'openid profile operator operatorrole buildee.v2.api',

  // BLDE_V2-24769
  automaticSilentRenew: false,
  silent_redirect_uri: `${window.location.origin}/silent.html`,
  // 認証トークンの更新処理のために次のファイルを配置している
  // .../buildee/Buildee_ERC_Front/public/
  //  silent.html
  //  silent.js
  //  libs/oidc-client.js
  filterProtocolClaims: false,
  loadUserInfo: true,
  revokeAccessTokenOnSignout: true,
  // extraQueryParams: {}, // 代理ログイン時に使用します

  silentRequestTimeout: 120000,
  // ライブラリ内部をみるとこの値のデフォルトは 10000 ミリ秒 = 10秒 になっている。
  // IE11 の場合のみ、
  // トークン更新時に 処理が重いと
  // Frame window timed out エラーがおきるので、
  // エラーを起こさないために、設定を長くする
};

// OIDCトークンのタイムアウト前にトークンを更新する時間(秒)
// 時刻がズレているユーザーもいるため、
// アクセストークン期限が600秒の場合、330秒程度がよいでしょう。
export const OIDC_TOKEN_TIMEOUT_BEFORE_SECOND = 330;

export const HEADER_CONSTANTS = {
  title: 'Buildee',
  conference: '調整会議',
  gatekeeper: '入退場',
  rouan: '労務安全',
  movement: '動態管理',
  equipment: '資機材管理',
};

/* eslint-disable no-multi-spaces */
export const BUILDEE_SERVICES = {
  CONFERENCE: { ID: 1, NAME: '調整会議', KEYWORD: 'conference' },
  ROAN: { ID: 2, NAME: '労務安全', KEYWORD: '' }, // 労務安全はURL体系が違うのでKEYWORDは基本使わない想定
  NYUTAI: { ID: 3, NAME: '入退場', KEYWORD: 'gatekeeper' },
};

// 画面分割時のvwというstate用の値(左右判定用)
export const PAGE_SIDE = {
  left: 1,
  right: 2,
};

// ユーザーロール
/* eslint-disable no-multi-spaces */
export const USER_ROLES = {
  system: { id: 1, key: 'system', name: 'システム管理者', desc: '元請' },
  prime: { id: 2, key: 'prime', name: '本社管理者', desc: '元請' },
  branch: { id: 3, key: 'branch', name: '支店管理者', desc: '元請' },
  manager: { id: 4, key: 'manager', name: '現場監督', desc: '元請' },
  partner: { id: 5, key: 'partner', name: '協力会社管理者', desc: '協力会社' },
  foreman: { id: 6, key: 'foreman', name: '職長', desc: '協力会社' },
  operator: { id: 7, key: 'operator', name: '作業員', desc: '協力会社' },
  driver: { id: 8, key: 'driver', name: 'ドライバー' },
  // operator と driver はシステムで使用しないため非推奨 破棄予定
};

export const USER_ROLES_IDS = {
  PRIME_COMPANY: [USER_ROLES.prime, USER_ROLES.branch, USER_ROLES.manager],
  PARTNER_COMPANY: [USER_ROLES.partner, USER_ROLES.foreman],
};
/* eslint-enable no-multi-spaces */
/* eslint-enable prettier/prettier */

// 期間設定フラグ
//  非推奨  破棄予定
//  カレンダーコントロールが期間指定がなくなったため
export const DATE_RANGE_TYPE = {
  term: { id: 0, key: '0', name: '期間指定' },
  date: { id: 1, key: '1', name: '日付指定' },
};

// 協力会社種別フラグ
// 一人親方種別フラグでは？
export const ONE_MASTER_FLAG = {
  corporation: { id: 0, name: '法人' },
  personal: { id: 1, name: '個人事業主' },
};

// 作業時間帯
export const WORK_HOUR_ZONES = {
  day: { id: 1, key: '1', name: '昼' },
  night: { id: 2, key: '2', name: '夜' },
  midnight: { id: 3, key: '3', name: '深夜' },
};

// APIリクエスト
export const REQUEST_PARAMS = {
  parentLimit: 30,
  childLimit: 10,
  firstCompaniesLimit: 20,
};

export const LIST_LIMIT = {
  WORK: {
    PARENT: 30,
    CHILD: 30,
  },
  GATE: {
    PARENT: 30,
    CHILD: 30,
  },
  CRANE: {
    PARENT: 30,
    CHILD: 30,
  },
  MACHINERY: {
    PARENT: 30,
    CHILD: 30,
  },
};

export const PARTNER_COMPANY_PARAMS = {
  parentLimit: 20,
  childLimit: 10,
};
// 会議モード
export const CONFERENCE_MODE = {
  off: { id: 0, key: '0', name: 'OFF' },
  on: { id: 1, key: '1', name: 'ON' },
};

// CCUS連携状態の表示も切り替え
export const CCUS_STATUS_DISPLAY_TOGGLE = {
  off: { id: 0, key: '0', name: 'OFF' },
  on: { id: 1, key: '1', name: 'ON' },
};

// 承認状態
export const APPROVAL_STATUS = {
  unapproved: { id: 0, name: '未承認' },
  approval: { id: 1, name: '承認済' },
  disapproval: { id: 2, name: '否認' },
};

// 現場系画面_作業時間帯
export const FIELD_WORK_HOUR_ZONES = {
  off: { id: 0, name: 'OFF' },
  on: { id: 1, name: 'ON' },
};

// 自動ロック最大日数
export const LOCK_MAX_DAYS = 255;

/**
 * 現場系画面_作業実績の入力を促す表示
 */
export const FIELD_INPUT_RESULT = {
  off: { id: 0, name: 'OFF' },
  on: { id: 1, name: 'ON' },
};

/**
 * 現場系画面_職長の作業予定の印刷方法
 */
export const FIELD_ADJUST_WORK_PRINT = {
  separate: { id: 0, name: '「作業安全指示書」と「現地KY記録表」を分けて印刷' },
  together: { id: 1, name: '「作業安全指示書及び現地KY記録表」にまとめて印刷' },
};

/**
 * 現場系画面_揚重作業計画・作業指示書の印刷向き
 */
export const FIELD_CRANE_USE_PRINT = {
  side: { id: 0, name: 'A4横型' },
  vertical: { id: 1, name: 'A4縦型' },
};

/**
 * 現場系画面_作業間連絡及び調整実施記録（安全衛生日誌有）の印刷方法
 */
export const FIELD_WORK_AND_DIARY_PRINT = {
  adjustment: { id: 0, name: '調整日の作業内容を出力' },
  plan: { id: 1, name: '予定日の作業内容のみ出力' },
};

// お問い合わせ画面_ステータス
export const CONTACT_STATUS = {
  inquiringOne: { id: 1, name: 'お問い合わせ中' },
  inquiringSecond: { id: 2, name: 'お問い合わせ中' },
  complete: { id: 3, name: '完了' },
};

// お問い合わせ画面_種別
export const CONTACT_TYPE = {
  use: { id: 1, name: '使い方' },
  trouble: { id: 2, name: '不具合' },
  other: { id: 3, name: 'その他のお問い合わせ' },
};

// お問い合わせ画面_ユーザータイプ
export const CONTACT_USER_TYPE = {
  admin: { id: 1, name: '管理者' },
  user: { id: 2, name: '利用者' },
};

// 現場ステータス
export const FIELD_COMPLETE_STATUS = {
  RUNNING: { ID: 0, NAME: '稼働中' },
  COMPLETED: { ID: 1, NAME: '竣工済' },
  EXPIRED: { ID: 2, NAME: '利用終了' },
};

// ユーザーステータス
export const USER_STATUS = {
  use: { id: 0, name: '利用中' },
  stop: { id: 1, name: '停止中' },
};

// 現場体制図承認状態
export const APPROVAL_STATUS_FIELDTREE = {
  invited: { id: 0, name: '招待中' },
  approval: { id: 1, name: '承認済' },
  pending: { id: 2, name: '承認待' },
};

// 入退状況
export const ENTER_STATUS = {
  out: { id: 0, name: '退場済' },
  enter: { id: 1, name: '入場中' },
};

// 労安状況
export const ROAN_STATUS = {
  off: { id: 0, name: '無し' },
  on: { id: 1, name: '有り' },
};

// 揚重機利用
export const CRANE_USES = {
  disuse: { id: 0, name: '無' },
  use: { id: 1, name: '有' },
};

// スポット利用
export const SPOT_STATUS = {
  normal: { id: 0, name: '通常' },
  spot: { id: 1, name: 'スポット' },
};

// ゲートステータス
export const GATE_PASSAGES_STATUS_CODE = {
  disable: { id: 0, name: '禁止' },
  carry: { id: 1, name: '搬入' },
  move: { id: 2, name: '搬出' },
  occupy: { id: 3, name: '占有' },
};

// 火器
export const HOT_WORKCODE = {
  gas: { id: 1, name: 'ガス' },
  arc: { id: 2, name: 'アーク' },
  gas_arc: { id: 3, name: 'ガス・アーク' },
  other: { id: 0, name: 'その他' },
};

// 契約
export const WORKER_TYPES = {
  contractor: { id: 0, name: '請負' },
  regular: { id: 1, name: '常傭' },
};

// 入退場者種別
export const ENTRANCE_WORKER_TYPES = {
  worker: { id: 0, name: '作業員', canSearch: true },
  permanent: { id: 1, name: '常駐社員', canSearch: true },
  temporary: { id: 2, name: '非常駐社員', canSearch: true },
  guest: { id: 3, name: 'ゲスト', canSearch: true },
};

// 勤務
export const WORK_EARLY_OVER_TYPES = {
  early: { id: 0, name: '早出' },
  over: { id: 1, name: '残業' },
};

// 作業場所
// ※棟, 階, エリア, 工区のこと
export const FIELD_ITEM_LISTS = {
  a: {
    id: [1],
    name: '作業場所A',
    entitiesName: 'field_item_a_lists',
    propName: 'a_item_id',
  },
  b: {
    id: [2],
    name: '作業場所B',
    entitiesName: 'field_item_b_lists',
    propName: 'b_item_id',
  },
  c: {
    id: [3],
    name: '作業場所C',
    entitiesName: 'field_item_c_lists',
    propName: 'c_item_id',
  },
  d: {
    id: [4],
    name: '作業場所D',
    entitiesName: 'field_item_d_lists',
    propName: 'd_item_id',
  },
};

// 予定登録フラグ
export const SCHEDULE_STATUS = {
  result: { id: 0, name: '実績' },
  schedule: { id: 1, name: '予定' },
};

// 協力会社承認機能_承認名
export const PARTNER_APPROVAL_NAME = {
  schedule: '受領',
  result: '確定',
};

// 予定種別
export const SCHEDULE_TYPES = {
  gate: { id: 1, name: 'ゲート' },
  crane: { id: 2, name: '揚重機' },
  machinery: { id: 3, name: '機材' },
};

// クレーン種別
export const CRANE_TYPES = {
  tower: { id: 1, name: 'タワークレーン' },
  crawler: { id: 2, name: 'クローラクレーン' },
  rough: { id: 6, name: 'ラフテレーンクレーン' },
  elevator: { id: 7, name: 'エレベータ' },
  track: { id: 8, name: '積載形トラッククレーン' },
};

// 機材種別
export const MACHINERY_TYPES = {
  construction: { id: 3, name: '車輌系建設機械' },
  forklift: { id: 4, name: 'フォークリフト' },
  vehicle: { id: 5, name: '高所作業車' },
  other: { id: 0, name: 'その他' },
};

// 機材種別
export const MACHINERY_TYPES_REPORT = {
  all: { id: 99, name: '全て' },
  construction: { id: 3, name: '車輌系建設機械' },
  forklift: { id: 4, name: 'フォークリフト' },
  vehicle: { id: 5, name: '高所作業車' },
  other: { id: 0, name: 'その他' },
};

// 巡回記録画面_是正報告フラグ
export const RECOVERY_FLAG = {
  incomplete: { id: 0, name: '未是正' },
  complete: { id: 1, name: '是正完了' },
};

// 巡回記録種別
export const SAFETY_TYPE = {
  point_out: { id: 1, name: '指摘(巡回)' },
  well_known: { id: 2, name: '周知(巡回)' },
  other: { id: 3, name: 'その他(巡回)' },
  contact: { id: 4, name: '当日作業連絡' },
  other_contact: { id: 5, name: 'その他連絡' },
};

// 法人格
export const LEGAL_PERSONALITIES = {
  a: { id: 1, name: '株式会社' },
  c: { id: 2, name: '有限会社' },
  e: { id: 3, name: '合同会社' },
  g: { id: 4, name: '合名会社' },
  i: { id: 5, name: '合資会社' },
  j: { id: 6, name: '国の機関' },
  k: { id: 7, name: '地方公共団体' },
  l: { id: 8, name: 'その他の設立登記法人' },
  m: { id: 9, name: '外国会社等' },
  other: { id: 99, name: 'その他' },
};

// 国税庁法人格変換
export const MAP_LEGAL_PERSONALITIES = {
  301: 1,
  302: 2,
  305: 3,
  303: 4,
  304: 5,
  101: 6,
  201: 7,
  399: 8,
  401: 9,
  499: 99,
};

// 表示フラグ
export const DISPLAY_FLAG = {
  unused: { id: 0, name: '未使用' },
  use: { id: 1, name: '使用中' },
};

// 試行期間フラグ
// TODO: 試行期間中のみ、trueに設定する trueに変更9/17大矢野
export const TRIAL_PERIOD_FLAG = false;

// 会社情報編集画面(支店情報)_請求先フラグ
export const BILLING_FLAG = {
  off: { id: 0, name: 'OFF' },
  on: { id: 1, name: 'ON' },
};

// 完了フラグ
export const FINISH_FLAG = {
  incomplete: { id: 0, name: '未完了' },
  complete: { id: 1, name: '完了' },
};

// 元請固有フラグ
export const JOINING_FLAG = {
  contractorInherent: { id: 0, name: '元請固有' },
  commonPartnerCompany: { id: 1, name: '共通協力会社' },
};

// 契約フラグ
export const CONTRACT_FLAG = {
  noContract: { id: 0, name: 'buildeeとの契約無し' },
  yesContract: { id: 1, name: 'buildeeとの契約有り' },
};

// 別途業者フラグ
export const PRIVATE_PARTNER_COMPANY_FLAG = {
  noPrivate: { id: 0, name: '非別途業者' },
  private: { id: 1, name: '別途業者' },
};

// 現場登録画面で転記対象のフォーム項目(現場情報)
export const COPY_FIELD_ADDRESS_SOURCE = [
  'postal_code',
  'address_prefecture',
  'address_city',
  'address_city_kana',
  'address_add_1',
  'address_add_1_kana',
  'address_add_2',
  'address_add_2_kana',
];

// 現場登録画面で転記対象のフォーム項目(事務所情報)
export const COPY_FIELD_ADDRESS_TARGET = [
  'office_postal_code',
  'office_address_prefecture',
  'office_address_city',
  'office_address_city_kana',
  'office_address_add_1',
  'office_address_add_1_kana',
  'office_address_add_2',
  'office_address_add_2_kana',
];

// 現場登録画面で転記対象のフォーム項目(任意項目のみ)
export const COPY_FIELD_ADDRESS_OPTIONAL = [
  'address_add_2',
  'address_add_2_kana',
  'office_address_add_2',
  'office_address_add_2_kana',
];

// 印刷グループ
export const WORK_GROUPS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const WORKING_TEMP_HOUR = [
  {
    id: '0.00',
    name: '0.00',
  },
  {
    id: '0.25',
    name: '0.25',
  },
  {
    id: '0.50',
    name: '0.50',
  },
  {
    id: '0.75',
    name: '0.75',
  },
  {
    id: '1.00',
    name: '1.00',
  },
];

// 0~200
const WorkerCountOptions = [];
for (let i = 0; i <= 200; i++) {
  WorkerCountOptions.push({
    id: i,
    name: i,
  });
}
export const SYSTEM_WORKER_COUNT = WorkerCountOptions;

// 1~200
const TrackCountOptions = [];
for (let i = 1; i <= 200; i++) {
  TrackCountOptions.push({
    id: i,
    name: i,
  });
}
export const SYSTEM_TRACK_COUNT = TrackCountOptions;

const DayMinutesIntervalOptions = [];
for (let i = 0; i <= 24; i += 0.25) {
  DayMinutesIntervalOptions.push({
    id: i.toFixed(2),
    name: i.toFixed(2),
  });
}
export const SYSTEM_WORK_HOUR = DayMinutesIntervalOptions;

// 15分単位の00:00~24:00 人工用
const WorkTimeOptions = [];
let t = 0;
for (let i = 0; i < 24; i++) {
  for (let s = 0; s <= 45; s += 15) {
    let l = `000${i}`.slice(-2);
    let r = `000${s}`.slice(-2);
    WorkTimeOptions.push({
      id: `${l}.${r}`,
      id2: t,
      normal: `${l}:${r}:00`,
      name: `${l}:${r}`,
    });
    t += 0.25;
  }
}
export const SYSTEM_WORK_TIME = WorkTimeOptions;

// スポット利用 5分単位の5~55
const SpotTimeOptions = [];
for (let i = 5; i <= 55; i += 5) {
  SpotTimeOptions.push({
    id: i,
    name: `${i}分`,
  });
}
export const SPOT_TIMES = SpotTimeOptions;

/** スポット利用の基本値(分) */
export const SPOT_TIMES_DEFAULT = String(SpotTimeOptions[0].id);

// 15分単位の00:00~24:00
const StartEndTimeOptions = [];
for (let i = 0; i <= 24; i++) {
  for (let s = 0; s <= 45; s += 15) {
    let l = `000${i}`.slice(-2);
    let r = `000${s}`.slice(-2);
    StartEndTimeOptions.push({
      id: `${l}:${r}:00`,
      data: `${l}.${r}`,
      name: `${l}:${r}`,
    });
  }
}
export const START_END_TIME = StartEndTimeOptions;

export const PREFECTURE_LISTS = {
  13: '東京都',
  14: '神奈川県',
  12: '千葉県',
  11: '埼玉県',
  8: '茨城県',
  9: '栃木県',
  10: '群馬県',
  27: '大阪府',
  26: '京都府',
  28: '兵庫県',
  25: '滋賀県',
  29: '奈良県',
  30: '和歌山県',
  23: '愛知県',
  21: '岐阜県',
  24: '三重県',
  22: '静岡県',
  1: '北海道',
  2: '青森県',
  3: '岩手県',
  5: '秋田県',
  4: '宮城県',
  6: '山形県',
  7: '福島県',
  20: '長野県',
  15: '新潟県',
  19: '山梨県',
  17: '石川県',
  16: '富山県',
  18: '福井県',
  34: '広島県',
  33: '岡山県',
  35: '山口県',
  31: '鳥取県',
  32: '島根県',
  38: '愛媛県',
  37: '香川県',
  36: '徳島県',
  39: '高知県',
  40: '福岡県',
  42: '長崎県',
  43: '熊本県',
  41: '佐賀県',
  44: '大分県',
  45: '宮崎県',
  46: '鹿児島県',
  47: '沖縄県',
};

export const PREFECTURE_GROUPS = {
  hokkaido_tohoku: {
    label: '北海道・東北',
    prefectures: {
      hokkaido: { id: 1, name: '北海道', kana: 'ホッカイドウ' },
      aomori: { id: 2, name: '青森県', kana: 'アオモリケン' },
      iwate: { id: 3, name: '岩手県', kana: 'イワテケン' },
      miyagi: { id: 4, name: '宮城県', kana: 'ミヤギケン' },
      akita: { id: 5, name: '秋田県', kana: 'アキタケン' },
      yamagata: { id: 6, name: '山形県', kana: 'ヤマガタケン' },
      fukushima: { id: 7, name: '福島県', kana: 'フクシマケン' },
    },
  },
  kanto: {
    label: '関東',
    prefectures: {
      ibaraki: { id: 8, name: '茨城県', kana: 'イバラキケン' },
      tochigi: { id: 9, name: '栃木県', kana: 'トチギケン' },
      gunma: { id: 10, name: '群馬県', kana: 'グンマケン' },
      saitama: { id: 11, name: '埼玉県', kana: 'サイタマケン' },
      chiba: { id: 12, name: '千葉県', kana: 'チバケン' },
      tokyo: { id: 13, name: '東京都', kana: 'トウキョウト' },
      kanagawa: { id: 14, name: '神奈川県', kana: 'カナガワケン' },
    },
  },
  koshinetsu_hokuriku: {
    label: '甲信越・北陸',
    prefectures: {
      niigata: { id: 15, name: '新潟県', kana: 'ニイガタケン' },
      toyama: { id: 16, name: '富山県', kana: 'トヤマケン' },
      ishikawa: { id: 17, name: '石川県', kana: 'イシカワケン' },
      fukui: { id: 18, name: '福井県', kana: 'フクイケン' },
      yamanashi: { id: 19, name: '山梨県', kana: 'ヤマナシケン' },
      nagano: { id: 20, name: '長野県', kana: 'ナガノケン' },
    },
  },
  tokai: {
    label: '東海',
    prefectures: {
      gifu: { id: 21, name: '岐阜県', kana: 'ギフケン' },
      shizuoka: { id: 22, name: '静岡県', kana: 'シズオカケン' },
      aichi: { id: 23, name: '愛知県', kana: 'アイチケン' },
      mie: { id: 24, name: '三重県', kana: 'ミエケン' },
    },
  },
  kansai: {
    label: '関西',
    prefectures: {
      shiga: { id: 25, name: '滋賀県', kana: 'シガケン' },
      kyoto: { id: 26, name: '京都府', kana: 'キョウトフ' },
      osaka: { id: 27, name: '大阪府', kana: 'オオサカフ' },
      hyogo: { id: 28, name: '兵庫県', kana: 'ヒョウゴケン' },
      nara: { id: 29, name: '奈良県', kana: 'ナラケン' },
      wakayama: { id: 30, name: '和歌山県', kana: 'ワカヤマケン' },
    },
  },
  chugoku_shikoku: {
    label: '中国・四国',
    prefectures: {
      tottori: { id: 31, name: '鳥取県', kana: 'トットリケン' },
      shimane: { id: 32, name: '島根県', kana: 'シマネケン' },
      okayama: { id: 33, name: '岡山県', kana: 'オカヤマケン' },
      hiroshima: { id: 34, name: '広島県', kana: 'ヒロシマケン' },
      yamaguchi: { id: 35, name: '山口県', kana: 'ヤマグチケン' },
      tokushima: { id: 36, name: '徳島県', kana: 'トクシマケン' },
      kagawa: { id: 37, name: '香川県', kana: 'カガワケン' },
      ehime: { id: 38, name: '愛媛県', kana: 'エヒメケン' },
      kouchi: { id: 39, name: '高知県', kana: 'コウチケン' },
    },
  },
  kyusyu_okinawa: {
    label: '九州・沖縄',
    prefectures: {
      fukuoka: { id: 40, name: '福岡県', kana: 'フクオカケン' },
      saga: { id: 41, name: '佐賀県', kana: 'サガケン' },
      nagasaki: { id: 42, name: '長崎県', kana: 'ナガサキケン' },
      kumamoto: { id: 43, name: '熊本県', kana: 'クマモトケン' },
      oita: { id: 44, name: '大分県', kana: 'オオイタケン' },
      miyazaki: { id: 45, name: '宮崎県', kana: 'ミヤザキケン' },
      kagoshima: { id: 46, name: '鹿児島県', kana: 'カゴシマケン' },
      okinawa: { id: 47, name: '沖縄県', kana: 'オキナワケン' },
    },
  },
};

// 画像ファイルサイズ
export const maxiileSize = 15728640;
export const RAPIDA_FILE_MAX_SIZE = 10485760;
export const RAPIDA_FACE_IMAGE_RANGE_RESOLUTION = {
  minSize: { width: 300, height: 300 },
  maxSize: { width: 4096, height: 4096 },
};

export const MANAGER_REQUEST_FILE_MAX_SIZE = 10485760;

// CCUSユーザー
export const CCUS_USER_ROLES = {
  company_admin: {
    id: 'company_admin',
    name: '事業者責任者',
    prefix: 'ccus_company_admin',
  },
  field_admin: {
    id: 'field_admin',
    name: '現場管理者',
    prefix: 'ccus_field_admin',
  },
};

// 用途
export const USE_TYPE = {
  Entry: { Id: 0, Name: '入場' },
  Exit: { Id: 1, Name: '退場' },
  Multi: { Id: 2, Name: '兼用' },
};

// APIフラグ用
export const API_FLAG = {
  On: 1,
  Off: 0,
};

// ON/OFFラジオボタン用
export const RADIO_BUTTON = {
  On: 1,
  Off: 0,
};

export const CHECKBOX = {
  On: 1,
  Off: 0,
};

// 有/無ラジオボタン用
//  非推奨
//    EXISTANCE_FLAG を使ってください。
//    変数名が変
export const FlagIndicator = [{ id: 0, name: '無' }, { id: 1, name: '有' }];

// 外国人就労者受入有無
export const AcceptanceForeignWorkersFlag = {
  NotAccept: { id: 0, name: '受入なし' },
  Accept: { id: 1, name: '受入あり' },
};

// 性別コード
export const SEX_TYPE = {
  Man: { Code: '1', DisplayName: '男性', Name: 'man' },
  Woman: { Code: '2', DisplayName: '女性', Name: 'woman' },
  Other: { Code: '3', DisplayName: 'その他', Name: 'other' },
};

// 作業員登録区分
export const REGISTER_CCUS_ENGINEER_TYPE = {
  Unregister: { Id: 0, Name: '未登録' },
  Registered: { Id: 1, Name: '登録済' },
};

// 入退場種別
export const IN_OUT_TYPE = {
  NoDistinction: { Id: 0, Name: '区別なし' },
  Entry: { Id: 1, Name: '入場' },
  Exit: { Id: 2, Name: '退場' },
};

// CCUS送信結果
export const CCUS_SEND_RESULT = {
  succeeded: { key: 'succeeded', Name: '成功' },
  failed: { key: 'failed', Name: '失敗' },
  executing: { key: 'executing', Name: '処理中' },
  none: { key: 'none', Name: '不明' },
};

// CCUSステータスマネージャー、処理中かどうか
export const EXECUTION_STATUS = {
  untreated: 0,
  executing: 1,
};

// 日付フォーマット
export const DATE_TIME_FORMAT = {
  slashDateFormat: 'YYYY/MM/DD',
  hyphenDateFormat: 'YYYY-MM-DD',
  weekdaySlashDateFormat: 'YYYY/MM/DD(ddd)',
  weekdayHyphenDateFormat: 'YYYY-MM-DD(ddd)',
  slashDateTimeFormat: 'YYYY/MM/DD HH:mm',
  slashDateTimeFormatNoYear: 'MM/DD HH:mm',
  hyphenDateTimeFormat: 'YYYY-MM-DD HH:mm',
  weekdaySlashDateTimeFormat: 'YYYY/MM/DD(ddd) HH:mm',
  weekdayHyphenDateTimeFormat: 'YYYY-MM-DD(ddd) HH:mm',
  weekdaySlashDateTimeSecondFormat: 'YYYY/MM/DD(ddd) HH:mm:ss',
  weekdayHyphenDateTimeSecondFormat: 'YYYY-MM-DD(ddd) HH:mm:ss',
  timeFormat: 'HH:mm',
  timeSecondFormat: 'HH:mm:ss',
  utcTimeFormat: 'HH:mm Z',
  utcTimeSecondFormat: 'HH:mm:ss Z',
};

export const SENT_TYPE = {
  checkInOutLog: 0,
  unidentifiedCheckInOutLog: 1,
};

//CCUS 発注区分
export const CCUS_ORDER_TYPE = {
  country: { id: 1, name: '公共工事（国）' },
  prefecture: { id: 2, name: '公共工事（都道府県）' },
  city: { id: 3, name: '公共工事（市区町村）' },
  other: { id: 4, name: '公共工事（その他）' },
  private: { id: 5, name: '民間工事' },
};

//CCUS 工事種類
export const CCUS_CONSTRUCTURE_TYPE = {
  housing: { id: 1, name: '建築・住宅工事' },
  civil: { id: 2, name: '土木工事' },
  other: { id: 3, name: '電気・空調衛生・その他工事' },
};

// 入退場・入場のみ
export const RECORDING_METHOD = {
  onlyAdmission: { id: 0, name: '入場のみ' },
  entranceAndExit: { id: 1, name: '入退場' },
};

// 承認状態
export const APPROVED_STATUS = {
  unapproved: { id: 0, name: '未承認' },
  approved: { id: 1, name: '承認済' },
};

// 社員・ゲスト入退場チェックを行う
export const SPOT_CHECK_STATUS = {
  dontCheck: { id: 0, name: '行わない' },
  check: { id: 1, name: '行う' },
};

// 体温検出基準値の36.0 ～ 39.0（0.1℃刻み）
const BodyTemperatureThresholdOptions = [''];
for (let i = 36; i <= 39; i++) {
  const subLimit = i == 39 ? 1 : 10;
  for (let j = 0; j < subLimit; j++) {
    let option = `${i}.${j}`;
    BodyTemperatureThresholdOptions.push(option);
  }
}
export const BODY_TEMPERATURE_THRESHOLD = BodyTemperatureThresholdOptions;

// 手入力体温検出基準値の34.0 ～ 42.0（0.1℃刻み）
const ManualBodyTemperatureOptions = [''];
for (let i = 34; i <= 42; i++) {
  const subLimit = i == 42 ? 1 : 10;
  for (let j = 0; j < subLimit; j++) {
    let option = `${i}.${j}`;
    ManualBodyTemperatureOptions.push(option);
  }
}
export const MANUAL_BODY_TEMPERATURE = ManualBodyTemperatureOptions;

// CCUS送信状態 (検索用)
export const SEARCH_CCUS_SENT_STATUS = {
  exempt: { id: -1, name: '対象外' },
  unsent: { id: 0, name: '未送信' },
  sending: { id: 1, name: '送信中' },
  sent: { id: 2, name: '送信済' },
  notSentAfterChange: { id: 3, name: '変更未送信' },
  sendingAfterChange: { id: 4, name: '変更送信中' },
  sendingError: { id: 5, name: '送信エラー' },
};

// CCUS送信状態
export const CCUS_SENT_STATUS = {
  sendingError: { id: -2, name: '送信エラー', status: '送信エラー' },
  exempt: { id: -1, name: '対象外', status: '対象外' },
  unsent: { id: 0, name: '未送信', status: '未送信' },
  getReadySending: { id: 1, name: '送信中', status: '送信準備中' },
  sending: { id: 2, name: '送信中', status: '送信中' },
  sent: { id: 3, name: '送信済', status: '送信済' },
  notSentAfterChange: { id: 4, name: '変更未送信', status: '変更未送信' },
  getReadySendingAfterChange: {
    id: 5,
    name: '変更送信中',
    status: '変更送信準備中',
  },
  sendingAfterChange: {
    id: 6,
    name: '変更送信中',
    status: '変更送信中',
  },
};

// 入退場実績デフォルト時間
export const DEFAULT_IN_OUT_RESULT_TIME = {
  in: { hour: 8, min: 0 },
  out: { hour: 17, min: 0 },
};

// 入退場実績ダイアログの表示ステータス
export const DIALOG_STATUS = {
  disabled: { id: 0 },
  confirmDialogEnabled: { id: 1 },
  registerDialogEnabled: { id: 2 },
  editDialogEnabled: { id: 3 },
  deleteDialogEnabled: { id: 4 },
  deleteFailDialogEnabled: { id: 5 },
  approveAllDialogEnabled: { id: 6 },
  approveAllFailDialogEnabled: { id: 7 },
  approvedDialogEnabled: { id: 8 },
  approveFailDialogEnabled: { id: 9 },
  unapprovedDialogEnabled: { id: 10 },
  unapprovedFailDialogEnabled: { id: 11 },
  uploadFailDialogEnabled: { id: 12 },
  networkErrorDialogEnabled: { id: 13 },
  deleteErrorDialogEnabled: { id: 14 },
  registerStartDialogEnabled: { id: 15 },
  updateSuccessDialogEnabled: { id: 16 },
  updateFailedDialogEnabled: { id: 17 },
  notExistFieldIdDialogEnabled: { id: 18 },
  imageSettingDialogEnabled: { id: 19 },
  ccusConnectingDialogEnabled: { id: 20 },
  ccusConnectConfirmDialogEnabled: { id: 21 },
  ccusConnectErrorDialogEnabled: { id: 22 },
  ccusFetchCompleteDialogEnabled: { id: 23 },
  cancelEditDialogEnabled: { id: 24 },
  updateErrorDialogEnabled: { id: 25 },
  cancelApproveFailDialogEnabled: { id: 26 },
  safetyDocItemErrorDialogEnabled: { id: 27 },
  leaveThisPageDialogEnabled: { id: 28 },
  selectWorkerFailDialogEnabled: { id: 29 },
  downloadInOutResultCsvFailDialogEnabled: { id: 30 },
  unidentifiedLogsAutoSendDialogEnabled: { id: 31 },
  otherErrorDialogEnabled: { id: 99 },
  attachFileNotExistDialogEnagled: {
    id: 'attachFileNotExistDialogEnagled',
  },
};

// ソートタイプ
export const SORT_TYPE = {
  asc: { id: 0, name: '_asc' },
  desc: { id: 1, name: '_desc' },
};

export const FILE_CODE = {
  EXCEL: 1,
  PDF: 2,
  WORD: 3,
  CSV: 4,
};

// 帳票印刷画面_作業時間帯
export const REPORT_WORK_HOUR_ZONE = {
  specific: { id: '0', name: '～作業のみ' },
  all: { id: '1', name: '全時間帯の作業' },
};

// ページ情報
export const PAGE_REFERER = {
  fields: { key: 'Fields', name: '現場一覧' },
  fieldRequestList: { key: 'FieldRequestList', name: '新規現場申請承認' },
};

// sessionに保存するときのkey一覧
export const SESSION_KEY_ITEM = {
  beforePageName: 'beforePageName',
};

// 作業員編集画面タブ
export const WORKER_TAB = {
  WORKER_INFO: {
    ID: 0,
    SHOW_PARTNER_ONLY: false,
    NAME: '基本情報',
    CLASS_NAME: 'workerInfo',
    TAB_NAME: 'WorkerInfo',
  },
  WORKER_IMAGE: {
    ID: 1,
    SHOW_PARTNER_ONLY: false,
    NAME: '顔写真',
    CLASS_NAME: 'workerImage',
    TAB_NAME: 'WorkerImage',
  },
  WORKER_SAFETY_BASIC_INFO: {
    ID: 2,
    SHOW_PARTNER_ONLY: true,
    NAME: '労務安全基本情報',
    CLASS_NAME: 'workerSafetyBasicInfo',
    TAB_NAME: 'WorkerSafetyBasicInfo',
  },
  JOB_LICENSE: {
    ID: 3,
    SHOW_PARTNER_ONLY: true,
    NAME: '職種・免許・資格',
    CLASS_NAME: 'jobLicense',
    TAB_NAME: 'JobLicense',
  },
  INSURANCE_INFO: {
    ID: 4,
    SHOW_PARTNER_ONLY: true,
    NAME: '保険加入状況',
    CLASS_NAME: 'insuranceInfo',
    TAB_NAME: 'InsuranceInfo',
  },
  ANAMNESES: {
    ID: 5,
    SHOW_PARTNER_ONLY: true,
    NAME: '既往症',
    CLASS_NAME: 'anamneses',
    TAB_NAME: 'Anamneses',
  },
  MEDICAL_EXAMINATION: {
    ID: 6,
    SHOW_PARTNER_ONLY: true,
    NAME: '健康診断',
    CLASS_NAME: 'medicalExamination',
    TAB_NAME: 'MedicalExamination',
  },
  URGENCY_CONTACT: {
    ID: 7,
    SHOW_PARTNER_ONLY: true,
    NAME: '緊急連絡先',
    CLASS_NAME: 'urgencyContact',
    TAB_NAME: 'UgencyContact',
  },
  TRAINING_COMMENDATION: {
    ID: 8,
    SHOW_PARTNER_ONLY: true,
    NAME: '受講表彰履歴',
    CLASS_NAME: 'trainingCommendation',
    TAB_NAME: 'TrainingCommendation',
  },
};

// 現場常駐社員・非常駐入退場者詳細画面タブ
export const SPOT_WORKER_TAB = {
  BASIC_INFO: {
    ID: 0,
    NAME: '基本情報',
    CLASS_NAME: 'basic-info',
    TAB_NAME: 'SpotWorkerInfo',
  },
  FACE_IMAGE: {
    ID: 1,
    NAME: '顔写真',
    CLASS_NAME: 'face-image',
    TAB_NAME: 'SpotWorkerFaceImage',
  },
};

// 作業員編集画面
// 安全書類項目
//  労務安全基本情報
export const SAFETY_DOC_ITEM_VALIDATE = {
  WORKER_SAFETY_BASIC_INFO: {
    BLOOD_TYPE: { KEY: 'blood_type', TEXT: 'ABO血液型' },
    BLOOD_TYPE_RH: { KEY: 'blood_type_rh', TEXT: 'Rh血液型' },
    FOREIGNER_FLAG: { KEY: 'foreigner_flag', TEXT: '国籍' },
    NATIONALITY: { KEY: 'nationality', TEXT: '国名' },
    RESIDENT_STATUS: { KEY: 'resident_status', TEXT: '在留資格' },
    STAYING_PERIOD_EXPIRATION_DATE: {
      KEY: 'staying_period_expiration_date',
      TEXT: '在留期間満了日',
    },

    EXPERIENCE_START_DATE: {
      KEY: 'experience_start_date',
      TEXT: '経験開始年月日',
    },
    EDUCATION: { KEY: 'education', TEXT: '雇入時教育受講有無' },
    ABILITY_IMPROVING_EDUCATION_CODE: {
      KEY: 'ability_improving_education_code',
      TEXT: '能力向上教育受講有無',
    },
    EMPLOYMENT_EDUCATION_DATE: {
      KEY: 'employment_education_date',
      TEXT: '雇入時教育年月日',
    },
    RECURRENT_PROTECTION_EDUCATION_CODE: {
      KEY: 'recurrent_protection_education_code',
      TEXT: '危険有害業務_再発防止教育受講有無',
    },
    EMPLOYER_IN_DATE: { KEY: 'employer_in_date', TEXT: '雇入年月日' },
    BLANK_MONTHS: {
      KEY: 'blank_months',
      TEXT: 'ブランク期間(月)',
    },
    POSTAL_CODE: { KEY: 'postal_code', TEXT: '郵便番号' },
    PREFECTURES: { KEY: 'prefectures', TEXT: '都道府県' },
    CITY_NAME: { KEY: 'city_name', TEXT: '市区町村' },
    ADDRESS1: { KEY: 'address1', TEXT: '住所1' },
    TEL: { KEY: 'tel', TEXT: '電話番号' },
  },
  JOB_LICENSE: {
    WORKER_JOBS: { KEY: 'worker_jobs', TEXT: '職種名' },
    WORKER_CORE_TECHNICIANS: {
      KEY: 'worker_core_technicians',
      TEXT: '登録基幹技能者名称',
    },
    WORKER_ENGINEER_LICENSES: {
      KEY: 'worker_engineer_licenses',
      TEXT: '技能士名称',
    },
    WORKER_LICENSES: { KEY: 'worker_licenses', TEXT: '免許資格名称' },
  },
  MEDICAL_EXAMINATION: {
    MEDICAL_EXAMINATION_DATE: {
      KEY: 'medical_examination_date',
      TEXT: '健康診断 健康診断受診日',
    },
    BP: {
      KEY: 'bp',
      TEXT: '健康診断 血圧上下',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_PNEUMOCONIOSIS: {
      KEY: 'special_medical_examination_date_pneumoconiosis',
      TEXT: 'じん肺健康診断 受診日',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_ASBESTOS: {
      KEY: 'special_medical_examination_date_asbestos',
      TEXT: '石綿健康診断 受診日',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_ORGANIC_SOLVENT: {
      KEY: 'special_medical_examination_date_organic_solvent',
      TEXT: '有機溶剤健康診断 受診日',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_SPECIFIC_CHEMICALS: {
      KEY: 'special_medical_examination_date_specific_chemicals',
      TEXT: '特定化学物質健康診断 受診日',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_IONIZATION: {
      KEY: 'special_medical_examination_date_ionization',
      TEXT: '電離放射線健康診断 受診日',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_VIBRATION_DISEASE: {
      KEY: 'special_medical_examination_date_vibration_disease',
      TEXT: '振動健康診断 受診日',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_HIGH_PRESSURE: {
      KEY: 'special_medical_examination_date_high_pressure',
      TEXT: '⾼気圧業務健康診断 受診日',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_LEAD: {
      KEY: 'special_medical_examination_date_lead',
      TEXT: '鉛健康診断 受診日',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_TETRAALKYL_LEAD: {
      KEY: 'special_medical_examination_date_tetraalkyl_lead',
      TEXT: '四アルキル鉛健康診断 受診日',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_DECONTAMINATION: {
      KEY: 'special_medical_examination_date_decontamination',
      TEXT: '除染等電離放射線健康診断 受診日',
    },
    SPECIAL_MEDICAL_EXAMINATION_DATE_DENTAL: {
      KEY: 'special_medical_examination_date_dental',
      TEXT: '⻭科特殊検診（歯牙酸蝕症健診） 受診日',
    },
  },
  ANAMNESES: {
    ANAMNESIS_TYPE: {
      KEY: 'anamnesis_type',
      TEXT: '既往症有無',
    },
  },
  INSURANCE_INFO: {
    HEALTH_INSURANCE_FLAG: {
      KEY: 'health_insurance_flag',
      TEXT: '健康保険 加入状況',
    },
    HEALTH_INSURANCE_TYPE: {
      KEY: 'health_insurance_type',
      TEXT: '健康保険 保険種類',
    },
    HEALTH_INSURANCE_OFFICE_SYMBOL: {
      KEY: 'health_insurance_office_symbol',
      TEXT: '健康保険 事業所整理記号',
    },
    HEALTH_INSURANCE_OFFICE_NUMBER: {
      KEY: 'health_insurance_office_number',
      TEXT: '健康保険 被保険者番号',
    },

    PENSION_FLAG: {
      KEY: 'pension_flag',
      TEXT: '年金 加入状況',
    },
    PENSION_TYPE: {
      KEY: 'pension_type',
      TEXT: '年金 年金種類名称',
    },
    PENSION_INSURANCE_RECEIVING_FLAG: {
      KEY: 'pension_insurance_receiving_flag',
      TEXT: '年金 受給状況',
    },

    EMPLOYMENT_INSURANCE_FLAG: {
      KEY: 'employment_insurance_flag',
      TEXT: '雇用保険 加入状況',
    },
    EMPLOYMENT_INSURANCE_TYPE: {
      KEY: 'employment_insurance_type',
      TEXT: '雇用保険 被保険者種類',
    },
    EMPLOYMENT_INSURANCE_INSURED_NUMBER: {
      KEY: 'employment_insurance_insured_number',
      TEXT: '雇用保険 被保険者番号',
    },
    CONST_SUBSCRIPTION_FLAG: {
      KEY: 'const_subscription_flag',
      TEXT: '退職金共済 建退共加入状況',
    },
    ENTERPRISE_SUBSCRIPTION_FLAG: {
      KEY: 'enterprise_subscription_flag',
      TEXT: '退職金共済 中退共加入状況',
    },
    OTHER_SUBSCRIPTION_FLAG: {
      KEY: 'other_subscription_flag',
      TEXT: '退職金共済 その他退職金共済制度加入状況',
    },
    WORKER_COMPENSATION_TYPE: {
      KEY: 'worker_compensation_type',
      TEXT: '労災保険特別加入 労災保険種類',
    },
  },
  URGENCY_CONTACT: {
    NAME: {
      KEY: 'name',
      TEXT: '緊急連絡先 連絡先氏名',
    },

    RELATIONSHIP: {
      KEY: 'relationship',
      TEXT: '緊急連絡先 続柄',
    },
    PREFECTURES: {
      KEY: 'prefectures',
      TEXT: '緊急連絡先 都道府県',
    },
    CITY_NAME: {
      KEY: 'city_name',
      TEXT: '緊急連絡先 市区町村',
    },
    ADDRESS1: {
      KEY: 'address1',
      TEXT: '緊急連絡先 丁目・番地',
    },
    ADDRESS2: {
      KEY: 'address2',
      TEXT: '緊急連絡先 建物名・部屋番号等',
    },
    TEL: {
      KEY: 'tel',
      TEXT: '緊急連絡先 電話番号',
    },
  },
  TRAINING_COMMENDATION: {
    TRAINING_NAME: {
      KEY: 'training_name',
      TEXT: '技能講習名称',
    },

    SPECAL_TRAINING_NAME: {
      KEY: 'specal_training_name',
      TEXT: '特別教育名称',
    },

    SAFETY_TRAINING_NAME: {
      KEY: 'safety_training_name',
      TEXT: '安全衛生講習名称',
    },
  },
};

// 作業員ページの表示ステータス
export const WORKER_PAGE_STATUS = {
  NEW: { ID: 0, NAME: '作業員登録', EDIT_MODE: false, DISABLED_ALL: false },
  CONFIRM: { ID: 1, NAME: '作業員編集', EDIT_MODE: true, DISABLED_ALL: true },
  EDIT: { ID: 2, NAME: '作業員編集', EDIT_MODE: true, DISABLED_ALL: false },
};

export const HYPHEN_DEFAULT_DAY = '1970-01-01';
export const SLASH_DEFAULT_DAY = '1970/01/01';

// 表示データをCSV出力
export const CSV_TYPE = {
  USER_LIST: 1, // 現場内管理者・職長一覧
  PARTNER_LIST: 2, // 協力会社一覧
};

// 選択可能画像形式
export const APPROVAL_FILE_TYPE = ['xlsx', 'pdf', 'jpg', 'png', 'gif'];

// ファイル拡張子ID
export const FILE_EXTENSION_ID = {
  ETC: 0, // その他
  JPG: 1, // jpg・jpeg
  GIF: 2,
  PNG: 3,
  PDF: 4,
};

// 作業時間時刻
export const INIT_WORK_TIME = {
  earlytime_end: '08:00:00', // 労働開始時刻_昼間
  earlytime_end_night: '20:00:00', // 労働開始時刻_夜間
  overtime_start: '17:00:00', // 労働終了時刻_昼間
  overtime_start_night: '05:00:00', // 労働終了時刻_夜間
  work_start_time: '06:00:00', // 作業時間帯バー開始時刻_昼間
  work_start_time_night: '18:00:00', // 作業時間帯バー開始時刻_夜間
  work_start_time_midnight: '00:00:00', // 作業時間帯バー開始時刻_深夜
  work_end_time: '21:00:00', // 作業時間帯バー終了時刻_昼間
  work_end_time_night: '08:00:00', // 作業時間帯バー終了時刻_夜間
  work_end_time_midnight: '08:00:00', // 作業時間帯バー終了時刻_深夜
  work_copy_time: '00:00:00', // 予定→実施入力反映時刻_昼間
  work_copy_time_night: '12:00:00', // 予定→実施入力反映時刻_夜間
};

// 連携サービスに関する定数
export const FACE_PICTURE_UPLOAD_STATUS = {
  notChangedFile: { id: 0 },
  uploadFailed: { id: 1 },
  uploadSuccess: { id: 2 },
  deleteFile: { id: 3 },
};

// 顔写真登録に関する定数
export const DELETE_FILE_FLAG = {
  notDeleteFlag: { id: 0 },
  deleteFlag: { id: 1 },
};

// HTTP レスポンスステータスコード
export const STATUS_CODE = {
  ok: 200,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
  serviceUnavailable: 503,
};

/**
 * 一覧画面から帳票を出力した場合の固有のHTTP レスポンスステータスコード
 */
export const STATUS_PRINT_ERROR_RESPONSE_CODE = {
  // ※既存のSTATUS_CODEがcamelCaseのため、それに合わせてcamelCaseとします。

  /** 帳票が150ページ超過 */
  reachMaxPage: 507,
  /** 帳票APIでの出力結果0件 */
  noData: 422,
  /** Docurainの処理可能容量超過 */
  docurainPaymentThresHold: 413,
};

// タイムアウト (2Sec)
export const TIME_OUT_TWO_SECOND = 2 * 1000;
// タイムアウト (5Sec)
export const TIME_OUT_FIVE_SECOND = 5 * 1000;

// 顔写真 (作業員設定状況一覧_検索)
export const WORKER_IMAGE_REGISTER_STATUS = {
  notRegister: { id: 0, name: '登録なし', className: 'not_register' },
  register: { id: 1, name: '登録あり', className: 'register' },
};

// 顔認証機器連携 (作業員設定状況一覧_検索)
export const WORKER_IMAGE_CCUS_SYNCED_STATUS = {
  notRegister: { id: 0, name: '未送信', canSearch: true },
  register: { id: 1, name: '送信済み', canSearch: true },
  excluded: { id: -1, name: '送信対象外', canSearch: true },
  someRegister: { id: 2, name: '一部未送信', canSearch: false },
};

// エラー状況 (作業員設定状況一覧_検索)
export const ERROR_STATUS = {
  register: { id: 1, name: '送信エラーのみを表示' },
};

// エラーメッセージ (作業員設定状況一覧_テーブル)
export const ERROR_MESSAGE = {
  someErrors: '一部エラーあり',
  allErrors: 'エラーあり',
};

// 重複作業員除外 (入退場実績追加の作業員一覧検索)
export const WORKER_DISTINCT_STATUS = {
  distinct: { id: 1 },
};

// 作業員施工体系施工体系検索の時、ccus技能者IDで参照するか
export const USE_CCUS_ENGINEER_ID = {
  use: { id: 1 },
};

// 作業員停止フラグ
export const BLOCKED_ON = {
  off: { id: 0 },
  on: { id: 1 },
};

// CCUS技能者情報取得フラグ
export const CCUS_WORKER_DATA_FETCH_FLG = {
  OFF: { ID: 0 },
  ON: { ID: 1 },
};

// CCUS連携ステータス
export const CCUS_SYNCED_STATUS = {
  UNSET: { ID: 0, NAME: 'CCUS未設定' },
  NONE: { ID: 1, NAME: 'CCUS未連携' },
  FAILED: { ID: 2, NAME: 'CCUS連携エラー' },
  DONE: { ID: 3, NAME: 'CCUS連携済み' },
  TEMP_DONE: { ID: 4, NAME: 'CCUS仮連携済み' },
};

// CCUS連携ステータス
export const FIELD_TREE_CCUS_SYNCED_STATUS = {
  UNSET: {
    ...CCUS_SYNCED_STATUS.UNSET,
    NAME: 'CCUS事業者ID未設定',
    TYPE: 'neutral',
  },
  NONE: {
    ...CCUS_SYNCED_STATUS.NONE,
    TYPE: 'neutral',
  },
  FAILED: {
    ...CCUS_SYNCED_STATUS.FAILED,
    TYPE: 'negative',
  },
  DONE: {
    ...CCUS_SYNCED_STATUS.DONE,
    TYPE: 'positive',
  },
  TEMP_DONE: {
    ...CCUS_SYNCED_STATUS.TEMP_DONE,
    TYPE: 'neutral',
  },
};

// 施工体系作業員CCUS連携ステータス
export const FIELD_TREE_WORKER_CCUS_SYNCED_STATUS = {
  NONE: { ID: 0, NAME: '未連携' },
  LACK_INFO: { ID: 4, NAME: '情報不足' },
  CONNECTING: { ID: 1, NAME: '連携中' },
  DONE: { ID: 2, NAME: '連携済', CLASS_NAME: 'status--positive' },
  ERROR: { ID: 3, NAME: '連携エラー', CLASS_NAME: 'status--error' },
};

export const CONNECT_WORK_HISTORY_STATUS = {
  CANNOT_CONNECT: { ID: -1, NAME: '送信不可' },
  CAN_CONNECT: { ID: 0, NAME: '送信可', CLASS_NAME: 'status--positive' },
};

export const CCUS_ENGINEER_ID_STATUS = {
  NOT_REGISTERED: { ID: 0, NAME: '登録なし' },
  REGISTERED: { ID: 1, NAME: '登録あり', CLASS_NAME: 'status--positive' },
};

// 作業員ステータス
export const WORKER_STATUS = {
  IN_OPERATION: { ID: 0, NAME: '稼働中' },
  WORK_DONE: { ID: 1, NAME: '作業終了' },
  RETIREMENT: { ID: 2, NAME: '退職' },
  ENROLLMENT: { ID: 3, NAME: '在籍' },
};

// SpotWorker区別(常駐、非常駐)
export const SPOT_WORKER_RESIDENCE_TYPE = {
  RESIDENT: { id: 0, name: '常駐社員' },
  NON_RESIDENT: { id: 1, name: '非常駐入退場者' },
};

// SpotWorker区別
export const SPOT_WORKER_TYPE = {
  WORKER: { id: 0, name: '作業員', code: 'worker', residenceTypeId: -1 }, // no residence type
  PERMANENT: { id: 1, name: '常駐社員', code: 'permanent', residenceTypeId: 0 },
  TEMPORARY: {
    id: 2,
    name: '非常駐社員',
    code: 'temporary',
    residenceTypeId: 1,
  },
  GUEST: { id: 3, name: 'ゲスト', code: 'guest', residenceTypeId: 1 },
};

// SpotWorkerステータス
export const SPOT_WORKER_STATUS = {
  IN_OPERATION: { id: 0, name: '稼働中' },
  SUSPENSION: { id: 1, name: '停止中' },
};

// 国籍
export const NATIONALITY_INFO = {
  JAPAN: { ID: '1', VALUE: 1, TEXT: '日本国籍' },
  FOREIGN: { ID: '2', VALUE: 2, TEXT: '外国籍' },
};

// 血液型 A B O AB
export const BLOOD_TYPE = {
  A: { ID: '1', VALUE: 1, TEXT: 'A' },
  B: { ID: '2', VALUE: 2, TEXT: 'B' },
  O: { ID: '3', VALUE: 3, TEXT: 'O' },
  AB: { ID: '4', VALUE: 4, TEXT: 'AB' },
};

// 血液型 RH + -
export const BLOOD_TYPE_RH = {
  PLUS: { ID: '1', VALUE: 1, TEXT: '+' },
  MINUS: { ID: '2', VALUE: 2, TEXT: '-' },
};

// 有無
export const EXISTANCE_FLAG = {
  NOEXIST: { ID: '0', VALUE: 0, TEXT: '無' },
  EXIST: { ID: '1', VALUE: 1, TEXT: '有' },
};

// 有無適用除外
export const EXISTANCE_EXCLUSION_FLAG = {
  NOEXIST: { ID: '0', VALUE: 0, TEXT: '無' },
  EXIST: { ID: '1', VALUE: 1, TEXT: '有' },
  EXCLUSION: { ID: '2', VALUE: 1, TEXT: '適用除外' },
};

// 疾病による適正配置対象者フラグ
export const ASSIGNED_DUE_TO_ILLNESS_FLAG = {
  NOT_APPLIES: { ID: 0, VALUE: '0', TEXT: '該当しない' },
  APPLIES: { ID: 1, VALUE: '1', TEXT: '該当する' },
};

// 有無
export const OBSERVATION_EXISTANCE_FLAG = {
  NOEXIST: { ID: 0, VALUE: '0', TEXT: '無' },
  EXIST: { ID: 1, VALUE: '1', TEXT: '有' },
};

// 受給状況(年金)
export const INSURANCE_RECEIVING_FLAG = {
  UNPAID: { ID: '0', VALUE: 0, TEXT: '未受給' },
  RECEIVED: { ID: '1', VALUE: 1, TEXT: '受給中' },
};

// 労災保険種類
export const WORKER_COMPENSATION_TYPE = {
  SINGLE_MASTER: { ID: '1', VALUE: 1, TEXT: '一人親方' },
  BUSINESS_OWNER: { ID: '2', VALUE: 2, TEXT: '事業主' },
  NEITHER: { ID: '0', VALUE: 0, TEXT: 'いずれでもない' },
};

// 会社情報 添付ファイル
export const ATTACH_DOCUMENT_TYPE_COMPANY = {
  CONTRACT: 'UPL010',
  CONSTRUCTION_PERMISSION: 'UPL020',
  HEALTH_INSURANCE: 'UPL030',
  PENSION_INSURANCE: 'UPL040',
  EMPLOYMENT_INSURANCE: 'UPL050',
  LABOR_ACCIDENT_INSURANCE_SPECIAL_ENROLLMENT: 'UPL060',
  SOCIAL_INSURANCE_INFO_PRIMARY: 'UPL070',
  SOCIAL_INSURANCE_INFO_SUBCONTRACTOR: 'UPL080',
  RETIREMENT_MUTUAL_AID: 'UPL090',
  APPROPRIATE_MANAGEMENT_PLAN: 'UPL100',
  TECHNICAL_SUPERVISOR: 'UPL110',
};

// 作業員情報 添付ファイル
export const ATTACH_DOCUMENT_TYPE_WORKER = {
  CERTIFICATE: 'UPL210', // 証明書関連
  LICENSE_QUALIFICATION: 'UPL190', // 免許資格関連
  ATTENDANCE_HISTORY: 'UPL200', // 教育受講履歴関連
  HEALTH_INSURANCE: 'UPL220', // 健康保険関連
  PENSION_INSURANCE: 'UPL230', // 年金保険関連
  EMPLOYMENT_INSURANCE: 'UPL240', // 雇用保険関連
  RETIREMENT_MUTUAL_AID: 'UPL260', // 退職金共済関連
  LABOR_ACCIDENT_INSURANCE_SPECIAL_ENROLLMENT: 'UPL250', // 労災特別加入関連
};

// マニュアル・問い合わせ画面タブ
export const MANUAL_CONTACT_TAB = {
  MANUAL: {
    ID: 'MANUAL_CONTACT_MANUAL',
    NAME: 'マニュアル＆補足資料',
  },
  CONTACT: {
    ID: 'MANUAL_CONTACT_CONTACT',
    NAME: 'お問い合わせ',
  },
  NOTICE: {
    ID: 'MANUAL_CONTACT_NOTICE',
    NAME: 'Buildeeからのお知らせ',
  },
  UPDATE_HISTORY: {
    ID: 'MANUAL_CONTACT_UPDATE_HISTORY',
    NAME: 'リリース内容',
  },
  VIDEO_MANUAL: {
    ID: 'MANUAL_CONTACT_VIDEO_MANUAL',
    NAME: '操作説明動画',
  },
};

/* eslint-disable no-multi-spaces */
/**
 * マニュアル＆補足資料
 */
export const MANUAL_FILE = {
  CONF_SETUP: {
    KEY: 'conferenceSetup',
    GROUP: '調整会議_',
    NAME: '初期設定編（PC版）',
  },
  CONF_OPERATION: {
    KEY: 'conferenceOperation',
    GROUP: '調整会議_',
    NAME: '日常業務編（PC版）',
  },
  CONF_SP: {
    KEY: 'conferenceSmartphone',
    GROUP: '調整会議_',
    NAME: 'スマートフォン版',
  },
  CONF_FAQ: {
    KEY: 'conferenceFaq',
    GROUP: '調整会議_',
    NAME: 'よくあるご質問',
  },
  CONF_IDPW: {
    KEY: 'conferenceIdpw',
    GROUP: '調整会議_',
    NAME: 'ID・PW情報の保持設定方法',
  },
  CONF_HOME: {
    KEY: 'conferenceAddScreen',
    GROUP: '調整会議_',
    NAME: '各ブラウザのホーム画面追加方法',
  },
  ENT_SETUP: { KEY: 'entranceSetup', GROUP: '入退場_', NAME: '初期設定編' },
  ENT_OPERATION: {
    KEY: 'entranceOperation',
    GROUP: '入退場_',
    NAME: '日常業務編',
  },
  GF_SETUP: { KEY: 'greenfileSetup', GROUP: '労務安全_', NAME: '初期設定編' },
  GF_OPERATION: {
    KEY: 'greenfileOperation',
    GROUP: '労務安全_',
    NAME: '日常業務編',
  },
  GF_PARTNER: {
    KEY: 'greenfileOperationPartner',
    GROUP: '労務安全_',
    NAME: '協力会社向け操作ガイド',
  },
  GF_FAQ: { KEY: 'greenfileFaq', GROUP: '労務安全_', NAME: 'よくあるご質問' },
  GF_GUIDE: {
    KEY: 'greenfileGuide',
    GROUP: '労務安全_',
    NAME: '労務安全書類（グリーンファイル）作成ガイド',
  },
};

//マニュアル会社種別
export const MANUAL_COMPANY_TYPE = {
  COMMON: {
    id: 0,
    name: '共通',
  },
  CONTRACTOR: {
    id: 1,
    name: '元請向けマニュアル',
  },
  PATNER: {
    id: 2,
    name: '協力会社向けマニュアル',
  },
};

// マニュアルサービス種別
export const MANUAL_SERVICE = {
  BUILDEE: {
    id: 0,
    name: 'Buildee共通',
  },
  CONFERENCE: {
    id: 1,
    name: '調整会議',
    logo: 'tyousei',
  },
  GATEKEEPER: {
    id: 2,
    name: '入退場',
    logo: 'nyutai',
  },
  ROUAN: {
    id: 3,
    name: '労務安全',
    logo: 'rouan',
  },
};

// 新規マニュアル基準日
export const NEW_MANUAL_DATE_TERM = 7;

export const DOES_NOT_UPDATE_OWN_PASSWORD = '1';

/* eslint-enable prettier/prettier */
/* eslint-enable no-multi-spaces */
export const SIGNALR_ACTION = {
  NEGOTIATE: 'Negotiate',
  PUBLISH: 'Publish',
  SEND_JSON: 'SendJson',
  EDIT_LOCK: 'Editlock',
  UN_EDIT_LOCK: 'UnEditlock',
  JOIN_ROOM: 'JoinRoom',
  LOAD_CANVAS: 'LoadCanvas',
  COPY_CANVAS: 'CopyCanvas',
  SET_BACKGROUND_IMAGE: 'SetBackgroundImage',
  SET_PRINT_RANGE: 'SetPrintRange',
  PRINT: 'Print',
  SPLIT_PRINT: 'SplitPrint',
  LOAD_MULTIPLE_CANVAS: 'LoadMultipleCanvas',
};

export const WORK_TYPE = {
  WORK_SCHEDULE: { ID: 1, NAME: '作業予定', SCHEDULE_FLAG: 1 },
  WORK_RESULT: { ID: 2, NAME: '作業実績', SCHEDULE_FLAG: 0 },
};

export const CSV_PROCESS_STATUS = {
  PROCESSING: { ID: 1, TEXT: '処理中' },
  AVAILABLE: { ID: 2, TEXT: 'ダウンロード可能' },
  ERROR: { ID: 9, TEXT: 'エラー' },
};

export const CSV_DOWNLOAD_STATUS = {
  NEW: { ID: 1, TEXT: 'CSVをダウンロード' },
  USED: { ID: 2, TEXT: 'もう一度ダウンロード' },
};

export const WORKER_SETTING_TAB = {
  FACE_PICTURE: { id: 0, title: '顔写真' },
  CCUS: { id: 1, title: 'CCUS連携' },
};

export const COM_DIVISION = {
  JIGYOUKYOU: {
    id: 1,
    label: '鹿島事業協',
  },
  KAEIKAI: {
    id: 2,
    label: '鹿栄会',
  },
  JYUTEN: {
    id: 3,
    label: '重点会社の区分',
  },
};

export const PASSWORD_TYPES = {
  SYSTEM_GENERATE_TYPE: 1,
  COMMON_INPUT_TYPE: 2,
};

/**
 * ユーザ画面の表示モード
 * */
export const USER_VIEW_MODE = {
  DETAIL: 1, // 詳細画面表示
  EDIT: 2, // 編集画面表示
  NEW: 3, // 新規作成画面表示
};

// 代行登録申請ステータス
export const AGENCY_REGISTRATION_APPLICATION_STATUS = {
  NOT_APPLIED: { ID: 0, TEXT: '申請待' },
  APPLIED: { ID: 1, TEXT: '申請中' },
  APPROVED: { ID: 2, TEXT: '承認' },
  REJECTED: { ID: 3, TEXT: '却下' },
  // APPLYING_RELEASE: { ID: 4, TEXT: '解除申請中' },
  // RELEASED: { ID: 5, TEXT: '解除' },
  EXPIRED: {
    ID: 7,
    TEXT: '失効',
  },
};

export const AGENCY_REGISTRATION_APPLICATION_PAGE = {
  LIST: {
    COMPONENT_NAME: 'AgencyRegistrationApplications',
    TEXT: '代行登録申請',
  },
  REGISTER: {
    COMPONENT_NAME: 'AgencyRegistrationApplicationRegister',
    TEXT: '新規代行登録申請',
  },
  DETAIL: {
    COMPONENT_NAME: 'AgencyRegistrationApplicationDetail',
    TEXT: '代行登録申請詳細',
  },
  EDIT: {
    COMPONENT_NAME: 'AgencyRegistrationApplicationEdit',
    TEXT: '代行登録申請編集',
  },
  ORIGINS: {
    COMPONENT_NAME: 'AgentOrigins',
    TEXT: '自社の代行元一覧',
  },
  ORIGIN_DETAIL: {
    COMPONENT_NAME: 'AgencyRegistrationApplicationOriginDetail',
    TEXT: '代行登録申請詳細',
  },
};

export const WEEK_INTERVAL_REPORT_IDS = [4, 5, 6, 52, 53, 116, 117, 148, 156];

export const EXPORT_WORKERS_COMPANY_MAX_LENGTH = 50;

export const MAX_WORKER_COUNT_DEFAULT = 300;

export const NOTIFICATIONS_FILTER_TYPE = {
  EXCLUDE_EXPIRED: 0,
  NONE: 1,
};

export const PARTNER_COMPANY_REGISTER_LOAD_FROM = {
  PARTNER_COMPANIES: 'PartnerCompanies',
  FIELD_TREE_PAGE: 'FieldTreePage',
  AGENCY_REGISTER: 'AgencyRegister',
};

export const ADMIN_STATUS_LIST = {
  NOT_SETTING: 0,
  WAITING_CONFIRM: 1, // 企業管理者申請中（申請済みかつ未承認）
  IS_CURRENT_ADMIN: 2, // 企業管理者設定済み（自分が企業管理者）
  IS_NOT_CURRENT_ADMIN: 3, // 企業管理者設定済み（自分が企業管理者ではない）
};

export const ENTRANCE_EXIT_RECORD_STATUS = {
  ALL: { id: 0, name: '入退場' },
  ONLY_CHECK_IN: { id: 1, name: '入場のみ' },
  ONLY_CHECK_OUT: { id: 2, name: '退場のみ' },
};

export const CALL_FROM_PAGE = {
  FIELD_TREE_PAGE: 'FIELD_TREE_PAGE',
};

// その他退職金共済制度加入状況フラグ
export const OTHER_SUBSCRIPTION_INSURANCE_STATUSES = [
  {
    key: 'NONE',
    value: '0',
    name: '無',
  },
  {
    key: 'PRESENCE',
    value: '1',
    name: '有',
  },
];

/**
 *
 * 労務安全項目の許可元区分名が知事の時に都道府県を選択する必要があり、
 * 都道府県が北海道の時、さらに振興局が選択できる。
 * 振興局には"なし"という選択肢があり、これをデータ上nullで扱うため初期値をなしとする
 */

export const REGIONAL_DEVELOPMENT_BUREAU_NONE = 'なし';

export const INTEGRATE_USER_COMMON_ERROR_MESSAGE =
  'エラーが発生しました。再度操作を行ってください。';

export const INTEGRATE_USER_SUCCESS_TITLE = 'アカウント統合完了';

export const INTEGRATE_USER_SUCCESS_MESSAGE =
  'アカウントの統合が完了しました。';

export const INTEGRATE_USER_CHANGE_EMAIL_CONFIRM_MESSAGE =
  'ユーザーID（メールアドレス）を変更すると自動的にログアウトします。変更後のIDで再度ログインしてください。\nユーザーIDを変更しますか？';

/**
 * Printout button click behavior
 * Remarks: I put it here instead of Works.js because these constants maybe used for other screens (Gates, SafetyDiaries,...)
 */
export const PRINTOUT_BUTTON_CLICK_BEHAVIOR = {
  displayErrorDialog: 0,
  printExcel: 1,
  printPDF: 2,
  displayListReportsDialog: 3,
};

export const WORKER_INSURANCE_MANUAL = {
  fileCode: 'workerInsuranceManual',
  fileName: '社会保険入力ガイド（作業員情報）.pdf',
};

export const COMPANY_INSURANCE_MANUAL = {
  fileCode: 'companyInsuranceManual',
  fileName: '社会保険入力ガイド（会社情報）.pdf',
};

// スマホ端末からPC画面をみるときの設定
export const PCVIEW_ON_SP = {
  on: '1',
};
