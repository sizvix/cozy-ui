/* global cozy */
import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../Spinner'
import styles from './styles.styl'

class IntentIframe extends React.Component {
  state = { loading: false }

  componentDidMount () {
    const { action, doctype, options, onComplete } = this.props

    const create = this.props.create || cozy.client.intents.create

    this.setState({ loading: true })
    create(action, doctype, {
        exposeIntentFrameRemoval: true,
        ...options
      })
      .start(this.intentViewer, this.onFrameLoaded)
      .then(result => {
        if (this.props.onComplete) {
          this.props.onComplete(result)
        }
      })
  }

  onFrameLoaded = () => {
    this.setState({ loading: false })
  }

  render (props, { loading }) {
    return (
      <div ref={intentViewer => (this.intentViewer = intentViewer)}>
        { loading ? <div className={styles.intentModal__loading}>
          <Spinner size='xxlarge' />
        </div> : null }
      </div>
    )
  }
}

IntentIframe.propTypes = {
  action: PropTypes.string.isRequired,
  doctype: PropTypes.string.isRequired,
  options: PropTypes.object,
  onComplete: PropTypes.func
}

IntentIframe.defaultProps = {
  options: {}
}

export default IntentIframe