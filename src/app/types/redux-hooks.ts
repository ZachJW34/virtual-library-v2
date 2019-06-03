import * as reactRedux from "react-redux";
import { Dispatch } from "../constants/action-types";

export function useSelector<T>(selector: (state: any) => T): T {
  return (reactRedux as any).useSelector(selector);
}

export function useDispatch(): Dispatch {
  return (reactRedux as any).useDispatch();
}
