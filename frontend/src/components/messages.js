import React, { Component } from "react";
import { inject, observer, useObserver, useLocalStore } from "mobx-react";
import { compose } from "recompose";

import { withFirebase } from "./Firebase";
import RenderCounter from "react-render-counter";

// import MessageList from "./MessageList";

@inject("messageStore", "sessionStore")
@observer
// @autobind
class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      loading: false,
    };
  }
  componentDidMount() {
    const { messageStore } = this.props;
    messageStore.findAll({ page: 0 });
  }

  onListenForMessages = () => {
    // this.props.firebase
    //   .getFirestore()
    //   .collection("messages")
    //   .orderBy("createdAt")
    //   .limit(this.props.messageStore.limit)
    //   .onSnapshot((snapshot) => {
    //     const docs = snapshot.docs.map(async (docSnapshot) => ({
    //       id: docSnapshot.id,
    //       data: await docSnapshot.data(),
    //     }));
    //     this.props.messageStore.setMessages(docs);
    //     console.log(this.props.messageStore.messageList);
    //     this.setState({ loading: false });
    //   });
  };

  componentWillUnmount() {
    const { messages } = this.props.messageStore;
    console.log(messages);
    // this.props.firebase.getFirestore().collection("messages").off();
  }

  componentDidUpdate() {
    const { messages } = this.props.messageStore;
    console.log(messages);
  }

  onNextPage = () => {
    // this.props.messageStore.setLimit(this.props.messageStore.limit + 5);
  };

  // componentDidUpdate(props) {
  //   if (props.messageStore.limit !== this.props.messageStore.limit) {
  //     this.onListenForMessages();
  //   }
  // }

  onCreateMessage(e) {
    e.preventDefault();
    this.props.messageStore.add(this.state.text);
    this.setState({ text: "" });
    // .then(this.props.messageStore.findAll({ page: 0 }));
  }

  onChangeText(val) {
    this.setState({ text: val });
  }

  render() {
    const { messages } = this.props.messageStore;
    // console.log(this.props);
    const { text, loading } = this.state;
    // const messages = messageStore.messageList;

    return (
      <div>
        {!loading && messages && (
          <button type="button" onClick={this.onNextPage}>
            More
          </button>
        )}

        {loading && <div>Loading ...</div>}

        {messages && <MessageList messages={messages} />}

        {!messages && <div>There are no messages ...</div>}

        <form onSubmit={(e) => this.onCreateMessage(e)}>
          <input
            type="text"
            value={text}
            onChange={(e) => this.onChangeText(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

const MessageList = ({ messages }) => {
  return useObserver(() => (
    <ul>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ul>
  ));
};

const MessageItem = ({ message }) => {
  return useObserver(() => (
    <li>
      <strong>{message.id}</strong> {message.data.message}
    </li>
  ));
};

export default compose(withFirebase)(Messages);
