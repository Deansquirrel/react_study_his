import React from 'react';

class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPage:0,//0-init(null),1-login,-2-pageLoader
            svrAddress:"",
        };
        this.refreshConfig.bind(this);
    }

    render(){
        const defaultPage = getDefaultPage();
        switch (this.state.showPage) {
            case 1:
                return (
                    <div>
                        <span>login</span>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <PageLoader defaultPage={defaultPage} />
                    </div>
                );
            default:
                return (<div>show page error</div>);
        }
    }
}