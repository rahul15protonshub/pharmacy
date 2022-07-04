return (
      
    <>
      {this.state.dashboardLoader && (
        <Loader loading={this.state.dashboardLoader} />
      )}
      <section className="dashboard-carousel-section">
        <div className="main-banner">
        {localStorage.removeItem("newest")}
        {this.state.banners.length > 0 && this.state.banners[0].attributes.images != null && (

          <Carousel
            isRTL={false}
            itemsToShow={1}
            itemsToScroll={1}
            itemPosition={"START"}
            pagination={this.state.banners[0].attributes.images.data.length > 1 ? true : false}
            showArrows={false}
            enableAutoPlay={true}
            breakPoints={[
              {
                width: 1,
                itemsToShow: 1,
                itemsToScroll: 1
              }]
            }
            autoPlaySpeed={5000}
          >
            {this.state.banners.length > 0 && this.state.banners[0].attributes.images.data.map((banner: any, index: number) => {


              return <div
                key={index}
                onClick={() => {
                  //@ts-ignore
                  banner.attributes.url_link && window.location.replace(banner.attributes.url_link)

                }}
                className="w-100 topslider"
              >
                <img src={banner.attributes.url} style={banner.attributes.url_link ? { cursor: 'pointer' } : { cursor: 'default' }} className="bg-banner"></img>
                <div className="main-container">
                  <div className="banner-text">
                  </div>
                </div>
              </div>
            })}
          </Carousel>
        )} 
        </div>
        

        
        <section className="content-part">
          <div className="main-container">
            <div className="service-steps d-none">
              <div className="step">
                <img src={Serviceicon1} className="banner-image" />
                <div>
                  <p>
                    <strong>
                      {content.homeFreeDeliveryStrip.FreeDelivery}
                    </strong>
                  </p>
                  <p>
                    {content.homeFreeDeliveryStrip.FreeDeliveryDescription}
                  </p>
                </div>
              </div>
              <div className="step">
                <img src={Serviceicon2} className="banner-image" />
                <div>
                  <p>
                    <strong>
                      {content.homeFreeDeliveryStrip.SecurePayment}
                    </strong>
                  </p>
                  <p>
                    {content.homeFreeDeliveryStrip.SecurePaymentDescription}
                  </p>
                </div>
              </div>
              <div className="step">
                <img src={Serviceicon3} className="banner-image" />
                <div>
                  <p>
                    <strong>{content.homeFreeDeliveryStrip.return}</strong>
                  </p>
                  <p>{content.homeFreeDeliveryStrip.returnDescription}</p>
                </div>
              </div>
              <div className="step border-0">
                <img src={Serviceicon4} className="banner-image" />
                <div>
                  <p>
                    <strong>{content.homeFreeDeliveryStrip.support}</strong>
                  </p>
                  <p>{content.homeFreeDeliveryStrip.supportDescrip}</p>
                </div>
              </div>
            </div>
            </div>

            <section className="collections" >
            <div className="main-container">
              <div class="yt-produstslider-info d-flex justify-content-between
               align-items-center">
                <h2>{"Product Categories"}</h2>
                <div class="yt-comonent-link">
                   <Button
            color="link yt-component-more px-0"  onClick={ () => {
              localStorage.setItem("newest", "By Newest")
                        //@ts-ignore
                        this.props?.history?.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc`);

            }}          >

           View All

          </Button>
                </div>
              </div>
              <div className="carousal">
                <button
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                  }}
                  disabled={!this.state.isCategoryPrevButtonActive || (this.state.collectionCategory.length == 0)}
                  className="carousel__back-button"
                >
                  <IoIosArrowDropleft
                    className="slider-left img-fluid"
                    /*@ts-ignore */
                    onClick={() => {
                      carousel?.current?.slidePrev();
                      const alldta = carousel.current.getDerivedPropsFromBreakPoint();
                      const isNextdisable = (alldta.children.length - alldta.itemsToShow) == carousel.current.getNextItemObj().index;
                      
                      setTimeout(()=>{
                        this.setState({
                          isCategoryPrevButtonActive : carousel?.current?.state.activePage != 0,
                          isCategoryNextButtonActive : false,
                        },()=>{
                          
                        })
                      },500)
                    }}
                  />
                </button>
                <button
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent"
                  }}
                  className="carousel__next-button"
                  disabled={this.state.isCategoryNextButtonActive || (this.state.collectionCategory.length == 0)}
                >
                  <IoIosArrowDropright
                    className="slider-right img-fluid"
                    /* @ts-ignore */
                    onClick={() => {
                      const alldta = carousel.current.getDerivedPropsFromBreakPoint();
                      const isNextdisable = (alldta.children.length - alldta.itemsToShow) == carousel.current.getNextItemObj().index;
                      carousel.current.slideNext();
                      console.log(carousel.current)
                      setTimeout(()=>{
                        this.setState({
                          isCategoryPrevButtonActive : carousel?.current?.state.activePage != 0,
                          isCategoryNextButtonActive : false ,
                        },()=>{
                          
                        })
                     },500)
                   }}
                  />
                </button>

                <Carousel
                  isRTL={false}
                  pagination={false}
                  showArrows={false}
                  //@ts-ignore
                  ref={carousel}
                  breakPoints={BreakpointsForCollection}
                 disableArrowsOnEnd
                >
                 
                    {this.state.collectionCategory &&
                    this.state.collectionCategory.map(
                      (category: any, index: any) => {
                        return (
                            
                          <div  key={index}>
                            <img
                              className="card-img-top"
                              src={category.attributes.product_image.url}
                              alt="Card image cap"
                              style={{ borderRadius: "50%" }}
                              onClick={() => {
                                localStorage.setItem("category", category.id);
                                //@ts-ignore
                                this.props?.history?.push(
                                  `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${
                                    category.id
                                  }`
                                );
                              }}
                            />
                            <div className="card-body">
                              <p className="card-text">
                                {category.attributes.name}
                              </p>
                            </div>
                          </div>
                         
                        );
                      }
                    )}
             
                </Carousel>
              </div>
              </div>
            </section>
            <div className="bottom-space">
              
            </div>
            
            <div className="new-collection-parent">
              <section className="new-collection">
              <div className="main-container">
                {/* <div className="box-carousal"> */}
                  {this.state.newCollection && (
                    <ProductCard
                      collection={this.state.newCollection}
                      name="New Arrivals"
                      onViewMore={() => {
                        localStorage.setItem("newest", "By Newest")
                        //@ts-ignore
                        this.props?.history?.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc`);

                      }}
                      disablePropertyName="isNewCollectionPrevButtonActive"
                      isNewCollectionPrevButtonActive={this.state.isNewCollectionPrevButtonActive}
                      setPrvsButtonDisabled={(carousel)=>{
                        setTimeout(()=>{
                          this.setState({
                            isNewCollectionPrevButtonActive : carousel?.current?.state.activePage != 0,
                          })
                        },500)
                      }}
                      addToCart={this.addToCart}
                      createWishlist={this.postWishlist}
                      deleteWishlist={this.delWishlist}
                      toSetDefaultVariant={this.toSetDefaultVariant}
                    />
                  )}
                {/* </div> */}
                </div>
              </section>
            </div>
         
          <div className="container-flex banner-flex">
            {this.state.banners.length > 0 && this.state.bannerPosition2 && this.state.bannerPosition2.attributes.images != null && (
              <div className="banner-single">
                <img
                  src={
                    this.state.bannerPosition2.attributes.images.data[0]
                      .attributes.url
                  }
                  style={this.state.bannerPosition2.attributes.images.data[0].attributes.url_link ? { cursor: 'pointer' } : { cursor: 'default' }}
                  alt="Card image cap"
                  onClick={() => {
                    //@ts-ignore
                    this.state.bannerPosition2.attributes.images.data[0].attributes.url_link && window.location.replace(this.state.bannerPosition2.attributes.images.data[0].attributes.url_link)

                  }}
                />
              </div>
            )}
          </div>

          <section className="new-collection">
            
            <div className="main-container">
              {/* <div className="box-carousal"> */}
                {this.state.featuredProduct && (
                  <TemplateThree
                    collection={this.state.featuredProduct}
                    name="Recommended Products"
                    onViewMore={() => {
                      localStorage.setItem("newest", "Recommended");
                      //@ts-ignore
                      this.props?.history?.push(
                        `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=recommended&sort[direction]=desc`
                      );
                    }}
                    disablePropertyName="isrcmdCollectionPrevButtonActive"
                    isrcmdCollectionPrevButtonActive={this.state.isrcmdCollectionPrevButtonActive}
                    setPrvsButtonDisabled={(carousel)=>{
                      setTimeout(()=>{
                        this.setState({
                          isrcmdCollectionPrevButtonActive : carousel?.current?.state.activePage != 0,
                        })
                      },500)
                    }}
                    addToCart={this.addToCart}
                    createWishlist={this.postWishlist}
                    deleteWishlist={this.delWishlist}
                    toSetDefaultVariant={this.toSetDefaultVariant}
                  />
                )}
              {/* </div> */}
            </div>
          </section>


          <div className="container-flex banner-flex">
            {this.state.banners.length > 0 && this.state.bannerPosition4 && this.state.bannerPosition4.attributes.images != null && (
              <div className="banner-single">
                <img
                  src={
                    this.state.bannerPosition4.attributes.images.data[0]
                      .attributes.url
                  }
                  style={this.state.bannerPosition4.attributes.images.data[0].attributes.url_link ? { cursor: 'pointer' } : { cursor: 'default' }}
                  alt="Card image cap"
                  onClick={() => {
                    //@ts-ignore
                    this.state.bannerPosition4.attributes.images.data[0].attributes.url_link && window.location.replace(this.state.bannerPosition4.attributes.images.data[0].attributes.url_link)

                  }}
                />
              </div>
            )}
          </div>



        </section>
      </section>
    </>
  );