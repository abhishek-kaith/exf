export interface IUser {
  id: string;
  email: string;
  userName: string;
  verified: boolean;
  isSubscribed: boolean;
}

export interface TaskResponse {
  output: string;
}

export interface UsageResponse {
  usage: {
    monthly: number;
    all: number;
  };
}
export interface ActiveSubscription {
  status: string;
  method: string;
}
export interface Task {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  input: string;
  output: string;
  source: string;
  requrestType: string;
}
