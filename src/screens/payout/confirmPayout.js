import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import Payout from '../../components/payout/Payout';
import Detail from '../../components/payout/Detail';
import Amount from '../../components/payout/Amount';
import LeftRight from '../../components/payout/left_right';
import Transfer from '../../components/payout/Transfer';
import CustomSeparator from '../../components/separators/customSeparator';
import { s, color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';
export default class payout extends Component {
  render() {
    return (
      <View style={[s.scrollview]}>
        <SettingHeader
          title="Confirm Payout"
          backgroundColor=""
          color={color.lightGrey}
        />

        <ScrollView>
          <Payout title="PAYOUT INFORMATION" />
          <LeftRight
            leftText="Current Balance"
            rightText="4.5"
            leftTextColor={color.lightGrey}
            rightTextColor={color.lightGrey}
            rightTextFontSize={18}
            leftTextFontSize={18}
            rightTextFontWeight=""
            leftTextFontWeight=""
          />
          <CustomSeparator
            heightt={1}
            colorr={color.lightGrey2}
            margintop={'0%'}
            width={'100%'}
          />
          <LeftRight
            leftText="Requested Amount"
            rightText="$5.5"
            leftTextColor={color.lightGrey}
            rightTextColor={color.lightGrey}
            rightTextFontSize={18}
            leftTextFontSize={18}
            rightTextFontWeight=""
            leftTextFontWeight=""
          />
          <CustomSeparator
            heightt={1}
            colorr={color.lightGrey2}
            margintop={'0%'}
            width={'100%'}
          />
          <LeftRight
            leftText="Direct Deposit Fee"
            rightText="$0.3"
            leftTextColor={color.lightGrey}
            rightTextColor={color.lightGrey}
            rightTextFontSize={18}
            leftTextFontSize={18}
            rightTextFontWeight=""
            leftTextFontWeight=""
          />
          <CustomSeparator
            heightt={1}
            colorr={color.lightGrey2}
            margintop={'0%'}
            width={'100%'}
          />
          <LeftRight
            leftText="Direct Deposit Ammount"
            rightText="$10.3"
            leftTextColor={color.lightGrey}
            rightTextColor={color.lightGrey}
            rightTextFontSize={18}
            leftTextFontSize={18}
            rightTextFontWeight=""
            leftTextFontWeight=""
          />
          <Payout title="BANK ACCOUNT INFORMATION" />
          <LeftRight
            leftText="Account Holder Name"
            rightText="Saint Jaen"
            leftTextColor={color.lightGrey}
            rightTextColor={color.lightGrey}
            rightTextFontSize={18}
            leftTextFontSize={18}
            rightTextFontWeight=""
            leftTextFontWeight=""
          />
          <CustomSeparator
            heightt={1}
            colorr={color.lightGrey2}
            margintop={'0%'}
            width={'100%'}
          />
          <LeftRight
            leftText="Bank Routing Number"
            rightText="****2322"
            leftTextColor={color.lightGrey}
            rightTextColor={color.lightGrey}
            rightTextFontSize={18}
            leftTextFontSize={18}
            rightTextFontWeight=""
            leftTextFontWeight=""
          />
          <CustomSeparator
            heightt={1}
            colorr={color.lightGrey2}
            margintop={'0%'}
            width={'100%'}
          />
          <LeftRight
            leftText="Checking Account Number"
            rightText="****2999"
            leftTextColor={color.lightGrey}
            rightTextColor={color.lightGrey}
            rightTextFontSize={18}
            leftTextFontSize={18}
            rightTextFontWeight=""
            leftTextFontWeight=""
          />
          <CustomSeparator
            heightt={1}
            colorr={color.lightGrey2}
            margintop={'0%'}
            width={'100%'}
          />

          <Transfer />
        </ScrollView>
      </View>
    );
  }
}
