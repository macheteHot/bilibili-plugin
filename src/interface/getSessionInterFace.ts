/* eslint-disable no-use-before-define */

interface SessionList {
  talker_id: number;
  session_type: number;
  at_seqno: number;
  top_ts: number;
  group_name: string;
  group_cover: string;
  is_follow: number;
  is_dnd: number;
  ack_seqno: number;
  ack_ts: number;
  session_ts: number;
  unread_count: number;
  last_msg: LastMsg;
  group_type: number;
  can_fold: number;
  status: number;
  max_seqno: number;
  new_push_msg: number;
  setting: number;
  is_guardian: number;
  is_intercept: number;
  is_trust: number;
}

interface LastMsg {
  sender_uid: number;
  receiver_type: number;
  receiver_id: number;
  msg_type: number;
  content: string;
  msg_seqno: number;
  timestamp: number;
  at_uids: null;
  msg_key: number;
  msg_status: number;
  notify_code: string;
  new_face_version?: number;
}

export interface IGetSessionInterFace {
  session_list: SessionList[];
  has_more: number;
  anti_disturb_cleaning: boolean;
  is_address_list_empty: number;
}
