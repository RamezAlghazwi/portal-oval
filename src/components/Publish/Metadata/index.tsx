import { BoxSelectionOption } from '@shared/FormInput/InputElement/BoxSelection'
import Input from '@shared/FormInput'
import { Field, useField, useFormikContext } from 'formik'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import content from '../../../../content/publish/form.json'
import { FormPublishData } from '../_types'
import IconDataset from '@images/dataset.svg'
import IconAlgorithm from '@images/algorithm.svg'
import styles from './index.module.css'
import { algorithmContainerPresets } from '../_constants'
import Alert from '@shared/atoms/Alert'
import { useMarketMetadata } from '@context/MarketMetadata'
import { getFieldContent } from '@utils/form'
import { useDropzone } from 'react-dropzone'
import { error } from 'console'
import { read } from 'fs'
import geoDataFromFile from '../../Map/data.json'
import { json, text } from 'stream/consumers'
import { string } from 'yup'
import { FeatureCollection } from 'geojson'

const assetTypeOptionsTitles = getFieldContent(
  'type',
  content.metadata.fields
).options
export default function MetadataFields(): ReactElement {
  const { siteContent } = useMarketMetadata()

  // connect with Form state, use for conditional field rendering
  const { values, setFieldValue } = useFormikContext<FormPublishData>()

  const [field, meta] = useField('metadata.dockerImageCustomChecksum')

  const [jsonData, setjsonData] = useState<FeatureCollection[]>()

  // BoxSelection component is not a Formik component
  // so we need to handle checked state manually.
  const assetTypeOptions: BoxSelectionOption[] = [
    {
      name: assetTypeOptionsTitles[0].toLowerCase(),
      title: assetTypeOptionsTitles[0],
      checked: values.metadata.type === assetTypeOptionsTitles[0].toLowerCase(),
      icon: <IconDataset />
    },
    {
      name: assetTypeOptionsTitles[1].toLowerCase(),
      title: assetTypeOptionsTitles[1],
      checked: values.metadata.type === assetTypeOptionsTitles[1].toLowerCase(),
      icon: <IconAlgorithm />
    }
  ]

  // Populate the Docker image field with our presets in _constants,
  // transformPublishFormToDdo will do the rest.
  const dockerImageOptions: BoxSelectionOption[] =
    algorithmContainerPresets.map((preset) => ({
      name: `${preset.image}:${preset.tag}`,
      title: `${preset.image}:${preset.tag}`,
      checked: values.metadata.dockerImage === `${preset.image}:${preset.tag}`
    }))

  useEffect(() => {
    setFieldValue(
      'services[0].access',
      values.metadata.type === 'algorithm' ? 'compute' : 'access'
    )
    setFieldValue(
      'services[0].algorithmPrivacy',
      values.metadata.type === 'algorithm'
    )
  }, [values.metadata.type])

  dockerImageOptions.push({ name: 'custom', title: 'Custom', checked: false })
  // ******************************* //
  // test cases to allow both text and file upload
  function handleFileRead(event) {
    const jsonDatalocal = JSON.parse(event.target.result)
    setjsonData(jsonDatalocal)
  }
  // console.log('jsonfromfile', jsonData)
  const [fileName, setFileName] = useState()
  function handleFile(event) {
    setFileName(event.target.files[0].name)
    const uploadedFile = event.target.files[0]
    // setFile(uploadedFile)
    console.log('i am here')
    const reader = new FileReader()
    reader.onload = handleFileRead
    reader.readAsText(uploadedFile)
  }

  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [inputType, setInputType] = useState('text')
  const [value, setValue] = useState('')

  const handleTextChange = (event) => {
    setText(event.target.value)
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    console.log('selected file', selectedFile)
    console.log('i am file selection')
    const reader = new FileReader()
    reader.onload = handleFileRead
    reader.readAsText(selectedFile)
    console.log('selected file', selectedFile)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // handle form submission with both text and file data
    console.log(text, file)
  }
  const handleRadioChange = (event) => {
    const selectedValue = event.target.value
    setInputType(selectedValue)
  }
  const handleValueChange = (event) => {
    setValue(event.target.value)
    console.log(event.target.value)
  }
  const [activeTab, setActiveTab] = useState('tab1')
  const handleTabClick = (tab) => {
    setActiveTab(tab)
    console.log('tab', tab)
  }

  // ************************************************** //

  return (
    <>
      <Field
        {...getFieldContent('nft', content.metadata.fields)}
        component={Input}
        name="metadata.nft"
      />
      <Field
        {...getFieldContent('type', content.metadata.fields)}
        component={Input}
        name="metadata.type"
        options={assetTypeOptions}
      />
      <Field
        {...getFieldContent('name', content.metadata.fields)}
        component={Input}
        name="metadata.name"
      />
      <Field
        {...getFieldContent('description', content.metadata.fields)}
        component={Input}
        name="metadata.description"
        rows={7}
      />
      {values.metadata.type === 'dataset' && (
        <Field
          {...getFieldContent('geojson', content.metadata.fields)}
          component={Input}
          type="text"
          name="metadata.geojson"
        />
      )}

      {values.metadata.type === 'dataset' && (
        <>
          <Field
            {...getFieldContent('geojsonasFile', content.metadata.fields)}
            component={Input}
            name="metadata.geojsonasFile"
          />
          <form>
            <label>
              <input
                {...getFieldContent('geojsonasFile', content.metadata.fields)}
                name="metadata.geojsonasFile"
                type="radio"
                value="text"
                checked={inputType === 'text'}
                onChange={handleRadioChange}
              />
              Text Input
            </label>
            <label>
              <input
                {...getFieldContent('geojsonasFile', content.metadata.fields)}
                name="metadata.geojsonasFile"
                type="radio"
                value="file"
                checked={inputType === 'file'}
                onChange={handleRadioChange}
              />
              File Input
            </label>
            <br />
            {inputType === 'text' ? (
              <input type="text" value={value} onChange={handleValueChange} />
            ) : (
              <input type="file" onChange={handleFileChange} />
            )}
            <br />
          </form>
        </>
      )}

      {values.metadata.type === 'dataset' && (
        <Field
          {...getFieldContent('geojson2', content.metadata.fields)}
          component={Input}
          name="metadata.geojson2"
        />
      )}

      <Field
        {...getFieldContent('serviceSD', content.metadata.fields)}
        component={Input}
        name="metadata.gaiaXInformation.serviceSD"
      />
      <Field
        {...getFieldContent('tags', content.metadata.fields)}
        component={Input}
        name="metadata.tags"
      />

      {values.metadata.type === 'algorithm' && (
        <>
          <Field
            {...getFieldContent('dockerImage', content.metadata.fields)}
            component={Input}
            name="metadata.dockerImage"
            options={dockerImageOptions}
          />
          {values.metadata.dockerImage === 'custom' && (
            <>
              <Field
                {...getFieldContent(
                  'dockerImageCustom',
                  content.metadata.fields
                )}
                component={Input}
                name="metadata.dockerImageCustom"
              />
              <Field
                {...getFieldContent(
                  'dockerImageChecksum',
                  content.metadata.fields
                )}
                component={Input}
                name="metadata.dockerImageCustomChecksum"
                disabled={
                  values.metadata.dockerImageCustomChecksum && !meta.touched
                }
              />
              <Field
                {...getFieldContent(
                  'dockerImageCustomEntrypoint',
                  content.metadata.fields
                )}
                component={Input}
                name="metadata.dockerImageCustomEntrypoint"
              />
            </>
          )}
        </>
      )}

      {values.metadata.type === 'dataset' && (
        <>
          <Field
            {...getFieldContent('containsPII', content.metadata.fields)}
            component={Input}
            name="metadata.gaiaXInformation.containsPII"
          />

          {values.metadata.gaiaXInformation.containsPII === true && (
            <div className={styles.gdpr}>
              <Field
                {...getFieldContent('dataController', content.metadata.fields)}
                component={Input}
                name="metadata.gaiaXInformation.PIIInformation.legitimateProcessing.dataController"
              />

              <Field
                {...getFieldContent('legalBasis', content.metadata.fields)}
                component={Input}
                name="metadata.gaiaXInformation.PIIInformation.legitimateProcessing.legalBasis"
              />

              <Field
                {...getFieldContent('purpose', content.metadata.fields)}
                component={Input}
                name="metadata.gaiaXInformation.PIIInformation.legitimateProcessing.purpose"
              />

              <Field
                {...getFieldContent(
                  'dataProtectionContactPoint',
                  content.metadata.fields
                )}
                component={Input}
                name="metadata.gaiaXInformation.PIIInformation.legitimateProcessing.dataProtectionContactPoint"
              />

              <Field
                {...getFieldContent(
                  'consentWithdrawalContactPoint',
                  content.metadata.fields
                )}
                component={Input}
                name="metadata.gaiaXInformation.PIIInformation.legitimateProcessing.consentWithdrawalContactPoint"
              />
            </div>
          )}
        </>
      )}

      <Field
        {...getFieldContent('termsAndConditions', content.metadata.fields)}
        component={Input}
        name="metadata.termsAndConditions"
      />
      <a
        className={styles.termsLink}
        href="/terms"
        rel="noopener noreferrer"
        target="_blank"
      >
        View Terms and Conditions
      </a>
    </>
  )
}
