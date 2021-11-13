import React from 'react';
import Board from '../components/board';
import DesktopBoard from '../components/desktop-board';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket,
      room: null
    };
  }

  componentDidMount() {
    const roomId = this.props.route.params.get('roomId');
    const { socket } = this.state;

    fetch(`api/joinroom/${roomId}/user/${this.props.screenName}`)
      .then(response => {
        if (response.status !== 200) {
          window.location.hash = '#lobby';
        }
      })
      .catch(err => console.error(err));

    socket.on('room update', data => {
      console.log(data);
    });
  }

  componentWillUnmount() {
    const { socket } = this.state;
    socket.off('room update');
  }

  render() {
    return (

      <>
      <header>
          <nav>
            <div className="nav-wrapper bg-columbia-blue">
              {/* {headerContent} */}
            </div>
          </nav>
        </header>
        <main>
          <div className="board-container">
          <Board/>
          <DesktopBoard/>
          </div>
      </main>
        <footer className="page-footer height-4rem bg-columbia-blue">
          <div className="container height-2p5rem">
            <div className="row">
              {/* {footerContent} */}
            </div>
          </div>
        </footer>
        </>
    );
  }
}
