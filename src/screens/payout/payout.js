import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import Payout from '../../components/payout/Payout';
import Detail from '../../components/payout/Detail';
import Amount from '../../components/payout/Amount';
import Summary from '../../components/payout/Summary';
import Button from '../../components/payout/Button.js';
import LeftRight from '../../components/payout/left_right';
import CustomSeparator from '../../components/separators/customSeparator';
import { s, color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';

export default class payout extends Component {
  render() {
    return (
      <View style={[s.scrollview]}>
        <SettingHeader
          title="Payout Details"
          backgroundColor=""
          color={color.lightGrey}
        />

        <ScrollView style={[s.scrollview]}>
          <Payout title="TRANSFER TYPE" />
          <Detail />
          <Payout title="REQUESTED AMOUNT" />
          <LeftRight
            leftText="(min $2)"
            rightText="$8.65"
            leftTextColor={color.lightGrey}
            rightTextColor={color.primary}
            rightTextFontSize={18}
            leftTextFontSize={18}
            rightTextFontWeight="bold"
            leftTextFontWeight=""
          />
          <Payout title="SUMMARY" />
          <LeftRight
            leftText="Current Balance"
            rightText="$8.65"
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
            leftText="Fee"
            rightText="$8.65"
            leftTextColor={color.lightGrey}
            rightTextColor={color.primary}
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
            leftText="Deposit Amount"
            rightText="$8.65"
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
            leftText="Processing Time"
            rightText="Up to 5 business days"
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
          <Button />
        </ScrollView>
      </View>
    );
  }
}
