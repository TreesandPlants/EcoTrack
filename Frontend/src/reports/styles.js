import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({

  page:{
    padding:40,
    fontSize:12,
    fontFamily:"Helvetica",
    backgroundColor:"#ffffff"
  },

  title:{
    fontSize:28,
    color:"#15803d",
    marginBottom:20,
    textAlign:"center"
  },

  subtitle:{
    fontSize:16,
    color:"#166534",
    marginBottom:12
  },

  section:{
    marginTop:15,
    marginBottom:15,
    padding:15,
    border:"1 solid #d1d5db",
    borderRadius:8
  },

  heading:{
    fontSize:18,
    color:"#166534",
    marginBottom:10
  },

  text:{
    fontSize:12,
    marginBottom:6
  },

  footer:{
    position:"absolute",
    bottom:20,
    left:40,
    right:40,
    textAlign:"center",
    color:"gray",
    fontSize:10
  },

  watermark:{
    position:"absolute",
    top:170,
    left:120,
    width:330,
    opacity:0.08
  }

});