export interface ReferralRewardDto {
  id: number;
  fromUserId: number;
  fromUserName: string;
  toUserId: number;
  toUserName: string;
  level: number;
  percent: number;
  points: number;
  amount: number;
  createdAt: string;
}
