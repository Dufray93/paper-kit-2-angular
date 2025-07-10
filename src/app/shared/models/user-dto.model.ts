export interface UserDto {
  id: number;
  name: string;
  email: string;
  referralCode: string;
  referredBy?: string;
  points: number;
  totalEarnings: number;
}
