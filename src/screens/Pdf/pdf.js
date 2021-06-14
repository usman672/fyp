import React from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import PDFView from 'react-native-view-pdf';
import SettingHeader from '../../components/header/settingHeader';
import { s, color } from '../../libs/styles';
import Loader from '../../components/loader/listingLoader';

// const resources = {
//   file:
//     Platform.OS === 'ios'
//       ? 'downloadedDocument.pdf'
//       : '/sdcard/Download/downloadedDocument.pdf',
//   url:
//     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
//   base64: 'JVBERi0xLjMKJcfs...',
// };
export default class PDFExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      isLoading:true,
      isotp: false,
      resources: {
        file:
          Platform.OS === 'ios'
            ? 'downloadedDocument.pdf'
            : '/sdcard/Download/downloadedDocument.pdf',
        url: this.props.route.params.source,
        base64: 'JVBERi0xLjMKJcfs...',
      },
    };
  }
  loader = () => {
    this.setState({isLoading:false})
  };
  render() {
    const { navigate } = this.props.navigation;
    const resourceType = 'url';
    return (
      <>
      <View style={{ flex: 1 }}>
        <SettingHeader
          title={this.props.route.params.title}
          backgroundColor={color.black}
          color={color.white}
        />
      
      {this.state.isLoading &&
     <Loader/>
}
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={this.state.resources[resourceType]}
          resourceType={resourceType}
          onLoad={() => this.loader()}
          onError={(error) => console.log('Cannot render PDF', error)}
        />
 
      </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
   
  },
 
});
