import dayjs from 'dayjs';

export const date = (): string => {
  const dateNow = dayjs();
  return dateNow.format('MM/DD/YYYY hh:mm:ss A');
};
