/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Mail as MailIcon } from '@material-ui/icons'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import { theme } from '@app-theme'
import tailwind from 'tailwind-rn'

const classes = StyleSheet.create({
  sticky: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    // @ts-ignore
    position: 'fixed',
    bottom: theme.mixins.toolbar.minHeight,
    left: 0,
    right: 0,
  },
  container: {
    padding: theme.spacing(3),
    borderColor: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.text.primary,
    // TODO: platform parseint
    fontSize: theme.typography.body1.fontSize as number,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: theme.palette.secondary.main,
    minWidth: 'auto',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1),
  },
})

interface Props {
  sendEmail(): any
  visible?: boolean
}

function ConfirmEmail({ sendEmail, visible }: Props) {
  return !!visible ? (
    <View style={classes.sticky}>
      <View
        style={[
          classes.container,
          tailwind('border items-center flex flex-row rounded bg-gray-800'),
        ]}
      >
        <Text style={[classes.text, tailwind('mr-2')]}>
          Please confirm your email to enable alerts and much more
        </Text>
        <Pressable
          onPress={sendEmail}
          accessibilityLabel={'Resend email confirmation'}
          style={classes.btn}
        >
          <MailIcon />
          <Text style={[classes.text, tailwind('ml-2')]}>Resend</Text>
        </Pressable>
      </View>
    </View>
  ) : null
}

export { ConfirmEmail }
