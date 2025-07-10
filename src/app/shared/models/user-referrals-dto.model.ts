import { UserDto } from './user-dto.model';
import { ReferralDto } from './referral-dto.model';
import { ReferralRewardDto } from './referral-reward-dto.model';

export interface UserReferralsDto {
  user: UserDto;
  referrals: ReferralDto[];
  rewards: ReferralRewardDto[];
}
