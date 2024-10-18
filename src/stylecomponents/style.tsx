import React from 'react'
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    bgbodycolor: {
        backgroundColor: '#000',

    },
    flexbodycolorone: {
        flex: 1,
    },
    prletive: {
        position: 'relative',
    },
    imglogcentr: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        top: '10%',
        zIndex: -1,
    },
    logocenter: {
        textAlign: 'center'
    },
    logoabsl: {
        height: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'red',
    },
    textclr: {
        color: '#fff',
    },
    pdlr: {
        paddingHorizontal: 15,
    },
    bigfontsize: {
        fontSize: 36,
        fontWeight: '600',
        zIndex: 5,
    },
    inputnuber: {
        backgroundColor: '#fff',
        zIndex: 2,
        width: '100%',
        borderRadius: 10,

        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',

    },
    rowflex: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rowflex1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    numberin: {
        width: '17%',
        paddingHorizontal: 5,
        color: '#000',
        fontWeight: '600'

    },
    inputborder: {
        color:'#000',
        height: 50,

        paddingHorizontal: 10,
    },
    widhtinpu82: {
        width: '83%',
        borderLeftColor: '#CEC6A4',
    },
    mttop10: {
        marginTop: 15,
    },
    btncontine: {
        borderRadius: 5,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    botmcontct: {
        position: 'absolute',
        bottom: 26,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
    },
    textwhite: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',

    },
    btntext: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
    },
    textbron: {
        color: '#D46E13',
        fontSize: 15,
        fontWeight: '500',
    },
    subbtn: {
        zIndex: 5,
        color: '#fff',
        textAlign: 'center',
        padding: 15,
        borderRadius: 10,
    },
    textcenter: {
        textAlign: 'center',
    },
    otpsection: {
        zIndex: 5,
    },
    texttop: {
        fontSize: 35,
        marginBottom: 10,
        color: '#fff',
        fontWeight: '700'
    },
    otpinput: {
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        width: '15%',
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 10,
    },
    otpinputrow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ftrimgabslot: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    categorybox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topheader: {
        backgroundColor: '#3740AA',
        paddingHorizontal: 15,
        paddingVertical:7,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    wallethedr: {
        backgroundColor: '#E5E9FE',
        borderRadius: 10,
    },
    walletp: {
        borderBottomColor: '#959494',
        borderBottomWidth: 0.4,
    },
    pdlr5: {
        paddingHorizontal: 12,
        paddingVertical: 13,
    },
    mb5: {
        marginBottom: 5,
    },
    textblue: {
        color: '#3740AA',
        fontSize: 15,
        fontWeight: '600',
    },
    addbtn: {
        paddingHorizontal: 13,
        paddingVertical: 8,
        fontSize: 18,
        borderRadius: 10,
    },
    addproduc: {
        paddingVertical: 4,
        borderRadius: 4,
    },
    blacktext: {
        color: '#000',
        fontWeight: '600',
        fontSize: 17,
    },

    containerrow: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dflexone: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    shadow: {
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 121,
            height: 332,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
        backgroundColor: '#fff'
    },
    setinrow: {
        padding: 10,
        borderRadius: 5,
        marginTop: 13
    },
    mbbotom10: {
        marginBottom: 10,
    },
    mr2: {
        marginRight: 10,
    },
    setingtext: {
        color: '#000',

        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 13,

    },
    logoutbtn: {
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
    },
    btnlgt: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '500'
    },
    mbbotom15: {
        marginBottom: 15,
    },
    Srchheader: {
        backgroundColor: '#3740AA',
        paddingHorizontal: 15,
      paddingVertical:10,
    },
    srchinput: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        // paddingVertical:10,
        borderRadius: 10,
        overflow: 'hidden',

    },
    srchtxtinpit: {
        paddingRight: 20,
        padding:7
      
    },
    hdingmain: {
        fontSize: 23,
        color: '#000',
        fontWeight: '600'
    },
    slidestc: {
        backgroundColor: '#E5E9FE',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        position: 'relative',
    },
    captiontxt: {
        fontSize: 18,
        color: '#000',
        fontWeight: '600',
    },
    categrycardbgclr: {
        backgroundColor: '#E5E9FE',
        borderRadius: 10,
        position: 'relative',
        padding: 5,
        minHeight: 110,
    },
    prductcategory: {
        backgroundColor: '#E5E9FE',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        position: 'relative',
        textAlign: 'center',
        width: '31%',
        minHeight: 105,
    },
    mttop20: {
        marginTop: 40,
    },
    mttop5: {
        marginTop: 5,
    },
    catryimgabs: {
        position: 'relative',
        top: -20,
        textAlign: 'center',
        alignSelf: 'center',
    },
    namecategry: {
        fontSize: 14,
        color: '#000',
        position: 'absolute',
        bottom: 10,
        fontWeight: '600',

        textAlign: 'center',
        alignSelf: 'center',
    },
    wrapper: {
        height: 240,
        textAlign: 'center',
    },

    prodcoff: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    offbtn: {
        backgroundColor: '#EB3C24',
        color: '#fff',
        fontWeight: '700',
        padding: 5,
        fontSize: 11,
        borderRadius: 5,

    },
    reletivprod: {
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    reletivprodubox: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        width: '32%',
        textAlign: 'center'
    },
    prductdecrp: {
        color: '#000',
        fontSize: 13,
        lineHeight: 20
    },
    decriptbox: {
        paddingVertical: 15,
    },

    bgcolrprice:{
        backgroundColor:'#FFB45E',
        padding:6,
        borderRadius:5,
    },
    textwhite1: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 17,
    },
    datebox: {
        backgroundColor: '#EDF0FF',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 18,
    },
    datehder: {
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 9,
        borderRadius: 7,
    },
    icondate: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    datesubcirption: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        width: wp(20),
        marginRight: 6,
    },
    centerlfex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    boxpadgsubsy: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 6,
        color: '#000',
    },
    grncolr: {
        backgroundColor: 'green',
        padding: 6,
        borderRadius: 9,
        minHeight: 61,
    },
    bgbodyapp: {
        backgroundColor: '#F3F3F3',
        flex: 1,
    },
    vactiondatarea: {
        backgroundColor: '#EDF0FF',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    bgcolorwhite: {
        backgroundColor: '#fff',
    },
    dateinputbox: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
    },
    colorblck: {
        color: '#000',
    },

    decriptheading: {
        paddingVertical: 5,
        color: '#000',
        fontWeight: '700',
        fontSize: 17,
        flex: 1,
    },
    reletiproname: {
        fontWeight: '600', fontSize: 12, color: '#000', marginBottom: 5, marginTop: 5
    },
    reletiprodgram: {
        color: '#959494', fontWeight: '600', fontSize: 12, marginBottom: 5
    },
    reletiprodprice: {
        color: '#000', fontSize: 14, fontWeight: '600'
    },
    addproductbtn: {
        color: '#fff',
        fontWeight: '600',
        paddingHorizontal: 2,
        textAlign: 'center',
        paddingVertical: 0,
        fontSize: 12,
    },
    botomvewcart: {
        backgroundColor: '#EB8E24',
        borderRadius: 15,
        padding: 15,
        marginBottom:15,
    },
    itemselectxt: {
        color: '#fff',
        marginBottom: 5,
        fontWeight: '600',
    },
    viewcartprc: {
        fontWeight: '700',
        color: '#fff',
        fontSize: 19,
    },
    cartarrow: {
        color: '#fff',
        fontWeight: '600'
    },
    boxplusmines: {
        backgroundColor: '#fff',
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: 5,
    },
    profibody: {
        backgroundColor: '#F3F3F3',
        flex: 1,
        paddingTop: 15,
    },
    profiinput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    inputgroup: {
        marginBottom: 15,
    },
    inputlabel: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
    },
    btncontun: {
        backgroundColor: '#C4C4C4',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    txtconti: {
        color: '#fff',
        fontSize: 20,

    },
    bodycentertext: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    tbnsubsrion: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
    },
    textsubcript: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
    dflx: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
  
    fontw6: {
        fontWeight: '600',
    },
    vacatftrfixed: {
        backgroundColor: '#fff',
        padding: 30,
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        width: wp(100),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    boxoderproser: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 25,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15,
    },
    bgyelow: {
        backgroundColor: '#F2DAB4',
        color: '#CC6932',
        paddingHorizontal: 8,
        paddingVertical: 3,
        fontSize: 12,
        borderRadius: 4,
        fontWeight: '600',
        marginRight: 11,
    },
    textblack: {
        color: '#000',
    },
    bggreen: {
        backgroundColor: '#CFF2B4',
        color: '#32CC4B',
        paddingHorizontal: 8,
        paddingVertical: 3,
        fontSize: 12,
        borderRadius: 4,
        fontWeight: '600',
        marginRight: 11,
    },
    bggray: {
        backgroundColor: '#CCC8BB',
        color: '#000',
        paddingHorizontal: 8,
        paddingVertical: 3,
        fontSize: 12,
        borderRadius: 4,
        fontWeight: '600',
        marginRight: 11,
    },
    bgwhite: {
        backgroundColor: '#fff',
        flex: 1
    },
    fntsize: {
        fontSize: 14,
    },
    font22: {
        fontSize: 13,
    },
    smalltext: {
        fontSize: 11,
    },
    productdetlsbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: "#000",
        paddingHorizontal: 15,
        paddingVertical: 18,
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        marginBottom: 10,
    },
    prodctimgwidt: {
        width: wp(25),
        backgroundColor: '#fff',
        textAlign: 'center',
        alignSelf:'center',
        borderRadius: 5,
        shadowColor: "#000",
        height:70,

        marginRight: 12,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    prodctname: {
        fontWeight: '600',
        fontSize: 13,
        color: '#000',
        marginBottom: 18
    },
    prctext: {
        fontSize: 13,
        color: '#000',
        fontWeight: '500',
        marginTop: 4
    },
    valprice: {
        fontSize: 12,
    },
    txtp: {
        fontSize: 11,
        color: '#959494',
        fontWeight: '500',

    },
    mr5: {
        marginRight: 20,
    },
    pricesection: {
        width: wp(25)
    },
    stikybg: {
        backgroundColor: '#FFEDED',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 30,
        position: 'relative',
    },
    bildetlheding: {
        fontWeight: '600',
        color: '#000',
        fontSize: 12
    },
    stkybgimg: {
        position: 'absolute',
        bottom: 0,
    },
    bilrate: {
        color: '#212529',
        fontSize: 12,
    },
    orddtails: {
        backgroundColor: '#EDF0FF',
        padding: 20,

    },
    lftpnael: {
        width: wp(30)
    },
    hlpcntr: {
        backgroundColor: '#fff',
        padding: 20,
    },
    lefthelp: {
        width: wp(13)

    },
    helptext: {
        fontSize: 11,
        color: '#212529',
    },





})
export default styles;