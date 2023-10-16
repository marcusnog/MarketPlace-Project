import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { ErrorContext } from "./Error";

export const useReconhece = (rout: string) => {
  const [loading, setloading] = useState<any>();
  const [data, setData] = useState<any>();

  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    setloading(true);
    const api = `http://20.226.77.29/platform-catalog-desktop-client/api/${rout}`;

    const token = window.localStorage.getItem("");

    axios({
      url: api,
      headers: {
        Authorization: `bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIzMTRDNTJEMjJGRkEzMjJFRjE0RjQ2QzQzRkREQjhGIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTY5NjcwODAsImV4cCI6MTY1Njk3MDY4MCwiaXNzIjoiaHR0cDovL2F1dGhhcGk6ODA4Mi9hdXRoYXBpIiwiY2xpZW50X2lkIjoicGxhdGFmb3JtLWNhdGFsb2ciLCJzdWIiOiI2MmJkZjI3Yjk4MjM1OTk1OGMzNDZlMWQiLCJhdXRoX3RpbWUiOjE2NTY5NjcwODAsImlkcCI6ImxvY2FsIiwiaWQiOiI2MmJkZjI3Yjk4MjM1OTk1OGMzNDZlMWQiLCJwcm9maWxlIjoiUGFydGljaXBhbnQiLCJlbWFpbCI6Imd1aWxoZXJtZS5oZW5yaXF1ZUByZWNvbmhlY2UudmMiLCJuaWNrbmFtZSI6Ikd1aWxoZXJtZSIsImFiaWxpdGllcyI6Ilt7XCJhY3Rpb25cIjpcIipcIixcInN1YmplY3RcIjpcIipcIn1dIiwiY2FtcGFpZ24iOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEiLCJqdGkiOiIwOTY0RUJCRjk2MkI1NkY3MjRGM0UxRkVCRTlBQzk5MyIsImlhdCI6MTY1Njk2NzA4MCwic2NvcGUiOlsiY2F0YWxvZyJdLCJhbXIiOlsiY3VzdG9tIl19.kG-1ST71DrO0QaanwzMfKPoOkP2zsU-1rs_C-IHN8vqTGBsWi9SEyLnyGKR6yqVbjsQIXMAtXyrrpuiVCTVi8PRhz9C8g124ijI8VLsELt_WOsMpwClwFXCH5ilrEurt2cCU6p8LaUw5mU4JzbJQGYpvxt3VXFElp1R_EvixeW5pungPQ7Jf4fIFaiWNj_QLRnqxh5kxy3F1f5BZ_r2qXT4y1qNJmwXiCNLdmCHvwYgq9nI4dFJsq75TWxSuYFjgY8XCuX3heGrdCaHMnyhohRAf72YKvc1F7ID2Zmgq4cJdJ9v4yZ6d-kPnGHIL2HM2FVFqeDqabQWkL0S6SvpEbw`,
      },
    })
      .then((res) => {
        setData(res.data.data);
        setloading(false);
      })
      .catch((error) => {
        setError(JSON.stringify(error));
      });
  }, []);

  return {
    loading,
    error: "",
    data,
  };
};
