/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { UserManager } from '@app/managers'
import { theme } from '@app-theme'
import { Link } from './link'

const UpgradeBanner = (): any => {
  return UserManager.freeAccount ? (
    <View style={styles.container}>
      <Text style={styles.text}>
        Upgrade your account to add multiple websites, edit scripts, and more{' '}
        <Link href={'/payments'} style={{ fontWeight: 600 }}>
          UPGRADE
        </Link>
      </Text>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: 6,
    backgroundColor: theme.palette.background.default,
    bottom: 0,
    width: '100%',
    paddingRight: '28vw',
    zIndex: 1,
    // @ts-ignore
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
  },
  text: {
    color: theme.palette.primary.light,
  },
})

export { UpgradeBanner }
