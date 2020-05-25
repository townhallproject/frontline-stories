import React from 'react'
import PropTypes from 'prop-types'
import { TermsOfUseTemplate } from '../../templates/terms-of-use'

const TermsOfUsePreview = ({ entry, widgetFor }) => (
  <TermsOfUseTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

TermsOfUsePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default TermsOfUsePreview
