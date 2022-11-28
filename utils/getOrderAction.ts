import orderStatus from '~/constants/orderStatus';

const getOrderAction = (status: string) => {
  switch (status) {
    case orderStatus.ON_PAYMENT:
      return [
        {
          text: 'cancelOrder',
          variant: 'outline-danger',
          status: orderStatus.CANCELLED,
        },
      ];
    case orderStatus.ON_PREPARING:
      return [
        {
          text: 'delivered',
          variant: 'outline-success',
          status: orderStatus.ON_DELIVERY,
        },
      ];
    default:
      return [
        {
          text: '',
          variant: '',
          status: '',
        },
      ];
  }
};

export default getOrderAction;
