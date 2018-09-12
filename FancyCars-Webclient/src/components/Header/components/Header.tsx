import * as React from 'react';

/**
 * Very basic header
 */
class Header extends React.Component<{}>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Fancy Cars</h1>
            </div>
        );
    }
}

export default Header;