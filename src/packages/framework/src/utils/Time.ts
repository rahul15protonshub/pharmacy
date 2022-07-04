import moment from "moment";

//@ts-ignore
export const getLocalDate = ({ date, fromFormat, toFormat }) => {
  let m =
    moment.utc(date, fromFormat)
      .local()
      .format(toFormat);
  return m;
}
