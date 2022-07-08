import axios from "axios";
import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "./actions";

export const fetchProducts = () => async (dispatch: any) => {
  try{
      const res = await axios.get(`https://wavescan-frontend-assessment.saurabhmudgal.repl.co/`)
      dispatch(fetchDataSuccess(res.data))
  }
  catch(error){
    dispatch(fetchDataError(error));
  }

}