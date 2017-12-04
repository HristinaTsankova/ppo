import React from 'react';
import { connect } from 'react-redux';
import { AlertList } from 'react-bs-notifier';
import Constants from './constants';

class Alerts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      position: Constants.alertPosition,
      timeout: Constants.alertTimeout
    };
  }

	generate = (type, title, message) => {
		const newAlert ={
			id: (new Date()).getTime(),
			type: type,
			headline: title,
			message: message
		};

		this.setState({
			alerts: [...this.state.alerts, newAlert]
		});
	}

	onAlertDismissed = (alert) => {
		const alerts = this.state.alerts;
		const idx = alerts.indexOf(alert);

		if (idx >= 0) {
			this.setState({
				alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
			});
		}
	}

	clearAlerts = () => {
		this.setState({
			alerts: []
		});
  }

  componentWillReceiveProps (props) {
    if (props.error !== null) {
      this.generate(Constants.alerTypes.danger, null, props.error.message);
    }
  }

  render() {
    return (
      <div>
        <AlertList
          position={this.state.position}
          alerts={this.state.alerts}
          timeout={this.state.timeout}
          showIcon={false}
          onDismiss={this.onAlertDismissed}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.errors.isError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);