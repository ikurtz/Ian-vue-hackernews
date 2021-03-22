import Rox from 'rox-browser'
import { betaAccess, isLoggedIn, getCompany } from './users'

// Creating container class & defining our feature flags. Registration happens below on line 37
export const Flags = {
  score: new Rox.Flag(false),
  ask: new Rox.Flag(false),
  show: new Rox.Flag(false),
  headerColor: new Rox.RoxString('is-dark', ['is-dark', 'is-primary', 'is-white'])
}
// Defining the configurationFetchedHandler for analytics
export const configurationFetchedHandler = fetcherResults => {
  if (fetcherResults.hasChanges && fetcherResults.fetcherStatus === 'APPLIED_FROM_NETWORK') {
    window.location.reload(false)
  }
}

// Defining the impressionHandler for reporting & analytics
export const impressionHandler = (reporting, experiment) => {
  if (experiment) {
    console.log('flag ' + reporting.name + ' value is ' + reporting.value + ', it is part of ' + experiment.name + ' experiment')
  } else {
    console.log('No experiment configured for flag ' + reporting.name + '. default value ' + reporting.value + ' was used')
  }
}

const options = {
  configurationFetchedHandler: configurationFetchedHandler,
  impressionHandler: impressionHandler
}
// Defining custom property values
Rox.setCustomBooleanProperty('isBetaUser', betaAccess())
Rox.setCustomBooleanProperty('isLoggedIn', isLoggedIn())
Rox.setCustomStringProperty('company', getCompany())

// Register Flags & setup environment key
Rox.register('default', Flags)
Rox.setup(process.env.VUE_APP_ROLLOUT_KEY, options)
