//@ts-ignore
import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Button } from "reactstrap";
//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
import "../assets/styles/page-loader.scoped.css";
// Customizable Area Start
// Customizable Area End
interface Props {
  title: string;
  content: string;
  buttonText: string;
  onButtonPress: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  // Customizable Area End
}
interface SS {
  // Customizable Area Start
  // Customizable Area End
}

class ProfileLoader extends React.Component<Props, S, SS> {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    // Customizable Area Start
    return (
      <>
        <section>
          <Container>
            <div className="trans-fl-pg-inner-wrap p-4 bg-white radius-10 trans-fl-pg-mb-80 mt-5">
              <div className="cart-pg-empty-main-wrap text-center py-5">
                <img
                  src={require("./images/animated_spinner.webp")}
                  className="img-fluid yt-transaction-cl-icn"
                  width="170"
                  height="212"
                />
                <div className="trans-fl-wrap ">
                  <h2
                    className="trans-fl-ttl my-3"
                    style={{ color: "#43b7a7" }}
                  >
                    {this.props?.title
                      ? this.props?.title
                      : content.errorOccured}
                  </h2>
                  <p className="trans-fl-text mb-0">
                    {this.props?.content
                      ? this.props?.content
                      : "Something Went Wrong!!"}
                  </p>
                </div>
                {this.props?.onButtonPress && (
                  <Button
                    color="secondary trans-fl-btn py-3 px-5 mt-3"
                    onClick={this.props?.onButtonPress}
                  >
                    {this.props?.buttonText
                      ? this.props?.buttonText
                      : "Go to Home"}
                  </Button>
                )}
              </div>
            </div>
          </Container>
        </section>
      </>
    );
    // Customizable Area End
  }
}

//@ts-ignore
export default withRouter(ProfileLoader);
// Customizable Area Start
// Customizable Area End
