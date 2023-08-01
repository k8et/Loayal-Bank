export type CardData = {
  id?: string;
  data: {
    currency: string;
    balance: number;
    cardNumber: string;
    isBlocked: boolean;
    userId: string;
    expirationDate: string;
    cvv: number;
    cardType: string;
    accountNumber: string;
    cardColor: string;
  };
};
