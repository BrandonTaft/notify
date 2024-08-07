import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    /************HEADER***********/
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding:3
    },
   

    /*********HEADER*********/
   
    headerTitle: {
        // fontFamily: "Rubik-Black",
        color: '#8789f7',
        fontSize: 32,
    },
    menuIcon: {
        position: 'absolute',
        left: 15
    },
    headerAvatarIcon: {
        color: "#fff",
        marginLeft: 'auto'
    },
    headerEditIcon: {
        marginRight: 5,
        bottom: 1
    },
    /**********PROFILE SCREEN*********/
    profileImageContainer: {
        position: 'relative',
        flex: 2
    },
    profileImage: {
        position: 'absolute',
        top: '50%'
    },
    profileImageBtnContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        backgroundColor: 'red',
        position: 'relative'
    },
    profileData: {
        flex: 1,
        alignItems: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
        zIndex: 99
    },
    profileText: {
        fontSize: 20,
        color: "#fff"
    },
    /**********PROFILE FORM MODAL *********/
    profileFormModal: {
        backgroundColor: '#fff',
        marginTop: 'auto',
        flex: .75,
        alignItems: "center",

    },
    profileFormModalBtnContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    /**********AVATAR*********/
    avatarContainer: {
        elevation: 2,
        height: 200,
        width: 200,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
    },
    uploadBtnContainer: {
        opacity: 0.7,

        backgroundColor: 'lightgrey',
        width: '100%',
        height: '25%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    /*******CHAT PREVIEW *************** */
    chatRoomPreviewItemContainer: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 20,
        paddingTop:3,
        paddingHorizontal: 15,
        backgroundColor: "#312e3f",
        
        margin: 5,
        elevation:4,
        overflow: 'hidden'
    },
    chatRoomPreviewTitle: {
        width:'100%',
        flexDirection: "row",
        justifyContent: "center",
       alignItems:'center'
    },
    chatRoomPreviewContent: {
        flex:1,
        flexDirection: "column",
        justifyContent: 'flex-end',
    },
    previewMessageWrapper: {
        alignItems: "flex-start",
        marginBottom: 10,
    },
    previewMessage: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
        marginLeft: 10,
        minWidth: "25%",
        alignSelf: 'flex-start',
    },
    pagination: {
        flexDirection: 'row',
        height: 40,
      },
      paginationDot: {
        width: 30 * 0.3,
        height: 30 * 0.3,
        borderRadius: 30 * 0.15,
      },
      paginationDotContainer: {
        backgroundColor:"blue",
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
      paginationIndicator: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        borderWidth: 2,
        borderColor: '#ddd',
      },
    /*******CHAT ROOM LIST SCREEN *******/
    reactions: {
        flexDirection: 'row'
    },
    // chatRoomListScreen: {
        
    //     flex: 1
    // },
    chatRoomListScreenFabGroup: {
        position: 'absolute',
        flexDirection: 'row',
        margin: 16,
        right: 0,
        top: 0,
        zIndex: 99
    },

    chatheading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "green",
    },
    chattopContainer: {
        backgroundColor: "#F7F7F7",
        height: 70,
        width: "100%",
        padding: 20,
        justifyContent: "center",
        marginBottom: 15,
        elevation: 2,
    },
    chatheader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    chatlistContainer: {
        paddingHorizontal: 10,
    },
    // chatemptyContainer: {
    //     width: "100%",
    //     height: "80%",
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    // chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 25 },
    messagingscreen: {
        flex: 1,
    },
    messaginginputContainer: {
        width: "100%",
        
        backgroundColor: "white",
        padding: 15,
        justifyContent: "center",
        flexDirection: "row",
    },
    messaginginput: {
        borderWidth: 1,
        backgroundColor:"#FFF",
        padding: 5,
        flex: 1,
        marginRight: 10,
        borderRadius: 20,
        fontSize: 17,
        maxHeight: 200
    },
    messagingbuttonContainer: {
        margin: 'auto',
        maxHeight: 50,
        width: "30%",
        backgroundColor: "green",
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    modalbutton: {
        width: "40%",
        height: 45,
        backgroundColor: "green",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
    },
    modalbuttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    modaltext: {
        color: "#fff",
    },
    modalContainer: {
        width: "100%",
        borderTopColor: "#ddd",
        borderTopWidth: 1,
        elevation: 1,
        height: 400,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        zIndex: 10,
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    modalinput: {
        borderWidth: 2,
        padding: 15,
    },
    modalsubheading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    messageWrapper: {
        width: "100%",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    message: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 5,
        marginLeft: 10,
        maxWidth: '50%',
        minWidth: "25%",
        alignSelf: 'flex-start',
    },
    mmessageText: {
        fontSize: 17
    },
    leftArrow: {
        position: "absolute",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },

    leftArrowOverlap: {
        position: "absolute",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20

    },
    rightArrow: {
        position: "absolute",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10
    },

    rightArrowOverlap: {
        position: "absolute",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20

    },
    mvatar: {
        marginRight: 5,
    },
    // cchat: {
    //     width: "100%",
    //     flexDirection: "row",
    //     alignItems: "center",
    //     borderRadius: 5,
    //     paddingHorizontal: 15,
    //     backgroundColor: "#fff",
    //     height: 80,
    //     marginBottom: 10,
    // },
    // cchat: {
    //     width: "100%",
    //     flexDirection: "row",
    //     alignItems: "center",
    //     borderRadius: 20,
    //     paddingHorizontal: 15,
    //     backgroundColor: "#312e3f",
    //     height: 80,
    //     marginBottom: 10,
    // },
    // cavatar: {
    //     marginRight: 15,
    // },
    cusername: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
    },
    cmessage: {
       
        opacity: 0.7,
    },
    // crightContainer: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     flex: 1,
    // },
    ctime: {
        opacity: 0.5,
    },
    upcomingContainer: {
        flex: 1,
        padding: 6,

    },
    title: {
        // fontFamily: "Rubik-Medium",
        color: 'grey',
        fontSize: 17,
        marginLeft: 8
    },
    btnContainer: {

        flex: 3,
        marginHorizontal: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 20,
        backgroundColor: '#312e3f',

    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bb86fa',
        borderRadius: 50,
        width: 60,
        height: 60
    },

    horizontalView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        flex: 1
    },
    modalView: {
        width: '100%',
        flex: 1,

        backgroundColor: '#15131d',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    mainText: {
        fontSize: 18,
        // fontFamily: 'Rubik-Regular',
        color: '#fff'
    },
    input: {
        width: '100%',
        fontSize: 19,
        // fontFamily: 'Rubik-Light',
        flex: 4,
        color: '#fff',
        backgroundColor: '#312e3f',
        borderRadius: 10,
        margin: 12,
        marginVertical: 0,
        textAlignVertical: 'top',
        padding: 10
    },
    addTime: {
        width: '100%',
        color: '#fff',
        backgroundColor: '#312e3f',
        borderRadius: 10,
        margin: 5,
        padding: 10
    },
});