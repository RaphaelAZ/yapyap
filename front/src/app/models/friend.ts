export interface Friend {
  id: string;
  username: string;
  status: 'pending' | 'accepted' | 'blocked';
}
