import React, { useEffect } from "react";
import "./index.scss";

<<<<<<< HEAD
import Sidebar from '../../components/SideBar';
import Messenger from '../../layouts/Messanger';
import { connect } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router';
import Loader from '../../components/Loader';
import dialogActions from '../../store/actions/dialogActions';
import conversationActions from '../../store/actions/conversatiosActions';
import UserProfile from '../../layouts/UserProfile';
=======
import Sidebar from "../../components/SideBar";
import Messenger from "../../layouts/Messenger";
import { connect } from "react-redux";
import { Route, Switch, useLocation } from "react-router";
import Loader from "../../components/Loader";
import dialogActions from "../../store/actions/dialogActions";
import conversationActions from "../../store/actions/conversatiosActions";
import UserProfile from "../../layouts/UserProfile";
import Settings from "../../layouts/Settings";
>>>>>>> e93a6b8 (добавление собеседников)

const Home = ({
                conversations,
  setCurrentDialogId,
  isLoading,
  setCurrentPartner,
  dialogsItems,
  setCurrentConversationId,
                setCurrentConversation,
                currentConvId

}) => {
  let { pathname } = useLocation();
  const path = "dialogs";

  useEffect(() => {
    if (pathname.includes(path)) {
      const dialogId = pathname.split(`/${path}/`).pop();
      setCurrentDialogId(dialogId);
      setCurrentConversationId(null);
        console.log(dialogId)
      if (dialogsItems) {
        let partner = dialogsItems.filter(
          (dialog) => dialog.dialogId === dialogId
        )[0];
        setCurrentPartner(partner);
      }
    }
    if (pathname.includes("/im/conversation/")) {
      const conversationId = pathname.split("/im/conversation/").pop();
      setCurrentConversationId(conversationId);
      setCurrentDialogId(null);
      setCurrentPartner(null);
        if (conversations) {
            console.log(currentConvId)
        }
    }
  }, [pathname, setCurrentDialogId, setCurrentConversationId, dialogsItems, setCurrentPartner, conversations]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="home-page">
          <Sidebar />
          <Switch>
<<<<<<< HEAD
            <Route path={['/dialogs', '/conversation']} component={Messenger} />
            <Route path={'/profile'} component={UserProfile} />
=======
            <Route path={["/im"]} component={Messenger} />
            <Route path={"/profile"} component={UserProfile} />
            <Route path={"/settings"} component={Settings} />
>>>>>>> e93a6b8 (добавление собеседников)
          </Switch>
        </section>
      )}
    </>
  );
};

export default connect(
  ({ auth, dialogs, conversations }) => ({
    isLoading: auth.isLoading,
    dialogsItems: dialogs.dialogs,
    conversations: conversations.items,
    currentConvId: conversations.currentConvId
  }),
  { ...dialogActions, ...conversationActions }
)(Home);
