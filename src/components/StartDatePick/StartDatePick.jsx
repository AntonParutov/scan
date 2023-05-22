import React from "react";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import store from "../../store/store";
import { observer } from "mobx-react-lite";

const StartDatePick = observer(() => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
      <Stack spacing={4} sx={{ width: 176 }}>
        <DatePicker
          label="Дата начала"
          renderInput={(params) => <TextField {...params} />}
          value={store.startDate}
          maxDate={store.endDate}
          disableFuture={true}
          onChange={(newVaue) => {
            store.setStartDate(newVaue);
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
});

export default StartDatePick;