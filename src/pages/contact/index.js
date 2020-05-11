import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Tell your story</h1>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'name'}>
                    Your name
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'name'}
                      onChange={this.handleChange}
                      id={'name'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'}>
                    Email
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'email'}
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'phone'}>
                    Phone
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'phone'}
                      name={'phone'}
                      onChange={this.handleChange}
                      id={'phone'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'city'}>
                    City
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'city'}
                      name={'city'}
                      onChange={this.handleChange}
                      id={'city'}
                      required={false}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'state'}>
                    State
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'state'}
                      name={'state'}
                      onChange={this.handleChange}
                      id={'state'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'zipcode'}>
                    Zipcode
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'zipcode'}
                      name={'zipcode'}
                      onChange={this.handleChange}
                      id={'zipcode'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'occupation'}>
                    Occupation
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'occupation'}
                      name={'occupation'}
                      onChange={this.handleChange}
                      id={'occupation'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'link'}>
                    Link to your story on social media
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'link'}
                      name={'link'}
                      onChange={this.handleChange}
                      id={'link'}
                      required={false}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'story'}>
                    More about you
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'story'}
                      onChange={this.handleChange}
                      id={'story'}
                      required={false}
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
