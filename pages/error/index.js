import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import history from '../../core/history';
import s from './styles.css';

class ErrorPage extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
  };

  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  constructor(props) {
    super();
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize() {
    const margin = ((document.documentElement.clientHeight - document.getElementById('header').scrollHeight - document.getElementById('footer').scrollHeight - 15 - this.refs.message.scrollHeight) / 2) - 15;
    if (margin > 0) {
      this.refs.message.style.marginTop = `${margin}px`;
    }
    else {
      this.refs.message.style.marginTop = '0px';
    }
  }

  componentDidMount() {
    this.onResize = this.onResize.bind(this);
  }

  render() {
    // if (this.props.error) console.error(this.props.error); // eslint-disable-line no-console

    const [code, title] = this.props.error && this.props.error.status === 404 ?
      ['404', 'Page not found'] :
      // ['Error', this.props.error.toString()];
      ['Error', 'Oops, something went wrong'];

    return (
      <div>
        {/* needed for sticky footer */}
        <div>
          <Row>
            <Col xs={12}>
              <div className={s.center} ref="message">
                <Image style={{display: 'none'}} src={require('../../img/favicon.ico')}  onLoad={this.onResize} />
                <h1 className={s.code}>{code}</h1>
                <p className={s.title}>{title}</p>
                {code === '404' &&
                  <p className={s.text}>
                    The page you're looking for does not exist or an another error occurred.
                  </p>
                }
                <p className={s.text}>
                  <a href="/" onClick={this.goBack}>Go back</a>, or select an option from the menu above.
                </p>
              </div>
            </Col>
          </Row>
        </div>



      </div>
    );
  }

}

export default ErrorPage;