

<Pressable
             android_ripple={
                RippleConfig = {
                    color: '#121212',
                    foreground: true,
                    borderLess: true
                }
            }
                onPress={() => setShowDeleted(!showDeleted)}
                style={styles.menuBtn}
            >
                <FontAwesome5 name="trash" size={28} color="#b804d1de" />
                <Text style={styles.menuBtnText}>Deleted</Text>
                {showDeleted ?
                    <FontAwesome5 name="chevron-circle-down" size={30} color="#fff" style={{ marginLeft: 'auto', marginTop: 5 }} />
                    :
                    <FontAwesome5 name="chevron-circle-right" size={30} color="#fff" style={{ marginLeft: 'auto', marginTop: 5 }} />
                }
            </Pressable>