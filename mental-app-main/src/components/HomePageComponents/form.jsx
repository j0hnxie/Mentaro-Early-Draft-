export const Form = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div id="form">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <br /><br /><br />

                <h2>Sample Form</h2>
                <p>
                  Here's what our standard mental state survey looks like; quick, simple, easy, and confidential. These
                  are our default questions, but they can be customized!
                </p>
              </div>
              <form name="sentMessage" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                      />
                      <p className="help-block text-danger" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Mood (on a scale of 1-10)"
                        required
                      />
                      <p className="help-block text-danger" />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                                    <textarea
                                      name="message"
                                      id="message"
                                      className="form-control"
                                      rows="4"
                                      placeholder="How are you feeling today?"
                                      required
                                    />
                  <p className="help-block text-danger" />
                </div>
                <div id="success" />
                <button type="submit" className="btn btn-custom btn-lg">
                  Submit
                </button>
              </form>
              <br /><br /><br /> <br /><br /><br />
              <br /><br /><br />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};