import { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Calendar({handleDateSelection}) {
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      console.log(params.date)
      console.log(new Date(params.date).toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }))
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Button icon={'calendar'} compact onPress={() => setOpen(true)} uppercase={false} mode="elevated">
         Calendar
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      </View>
  )
}