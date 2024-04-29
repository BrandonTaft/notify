import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

export default function Alert({ message, setMessage }) {
    const hideDialog = () => setMessage("");
    const theme = useTheme();
    return (
        <Portal>
            <Dialog
                visible={message}
                onDismiss={hideDialog}
                style={
                    {
                        backgroundColor: theme.colors.surface,
                        paddingVertical: 20,
                        alignItems: 'center',
                        borderStyle: 'solid',
                        borderColor: theme.colors.primary,
                        borderWidth: 1,
                        borderRadius: 16,
                    }
                }
            >
                <Dialog.Title>
                    <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>Alert</Text>
                </Dialog.Title>
                <Dialog.Content>
                    <Text variant="titleMedium" style={{ fontSize: 18 }}>{message}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={hideDialog}
                        labelStyle={{ fontSize: 20 }}
                    >
                        Done
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
};