import orderStatus from '~/constants/orderStatus';

const getStatusVariant = (status: string) => {
  switch (status) {
    case orderStatus.CANCELLED:
      return 'danger';
    case orderStatus.ON_PAYMENT:
      return 'warning';
    case orderStatus.ON_PREPARING:
      return 'info';
    case orderStatus.ON_DELIVERY:
      return 'success';
    default:
      return 'primary';
  }
};

export default getStatusVariant;
