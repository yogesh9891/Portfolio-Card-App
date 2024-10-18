import { CardData } from "../components/AddConnection";
import { ConnectionData } from "../components/ViewConnection";

export type AuthorisedStackStackNavigatorParamList = {
     Home: undefined;
     BottomTabNav: undefined;
     Connections: undefined;
     Insight: undefined;
     Profile: undefined;
     Share: undefined;
     AddBusiness: undefined;
     LinkStore: undefined;
     Preview: {cardObj:any};
     CardList: undefined;
     HowToTap: undefined;
     Setting: undefined;
     PrivacyPolicy: undefined;
     CameraCard: undefined;
     DeleteList: undefined;
     Verfication: undefined;
     LinkPage: undefined;
     AddCard:  { type: string };
     EditCard:  { cardNo: string }
     EditProfile:  { cardNo: string }
     CopyCard:  { cardNo: string }
     AddConnection:  { cardData: CardData }
     ViewConnection:  { cardData: ConnectionData }
  };



  
  