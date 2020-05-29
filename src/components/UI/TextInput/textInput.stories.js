import React from 'react';
import { withKnobs, text, radios } from "@storybook/addon-knobs";
import SimpleCombined from './SimpleCombined';

export default {
    component: SimpleCombined,
    title: 'SimpleCombined',
    decorators: [withKnobs],
    excludeStories: /.*Data$/,
};

const label = 'Message Type';
const options = {
  Error: 'Error',
  Success: 'Success',
  Link: 'Link',
};
const defaultValue = 'Error';

export const simpleCombinedData = {
    id: 'simpleCombined',
    type: 'text',
    placeholder: 'Placeholder',
    label: 'Label',
    disabled: false,
    value: '',
    msgValue: '',
    msgType: '',
    focus: '',
    blur: '',
    changed: ''
}


export const Default = () => <SimpleCombined config={{...simpleCombinedData}} />

export const Filled = () => <SimpleCombined config={{...simpleCombinedData, value: text("Value", "Input Text")}}/>

export const Disabled = () => <SimpleCombined config={{...simpleCombinedData, disabled: true}} />

export const withMessage = () => <SimpleCombined config={{...simpleCombinedData, msgValue: text("Message Value", "-Message Details-"), msgType: radios(label, options, defaultValue)}} />

