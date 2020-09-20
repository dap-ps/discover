/**
 *
 * UploadButton
 *
 */

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Typography,
  Slider,
  Button,
  FormHelperText,
} from '@material-ui/core';
import { FieldProps, getIn } from 'formik';
import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import Cropper from 'react-easy-crop';
import { appColors, uiConstants, brandColors } from 'theme';

const styles = ({ breakpoints, palette }: Theme) =>
  createStyles({
    root: {},
    error: {
      color: palette.error.main,
    },
    errorText: {
      marginLeft: 15,
      marginRight: 15,
    },
    label: {
      fontSize: 15,
      color: appColors.general.gray.base,
      '&.error': {
        color: palette.error.main,
      },
    },
    cta: {
      position: 'relative',
      width: 150,
      height: 150,
      borderRadius: '50%',
      border: `1px dashed ${appColors.general.gray.base}`,
      margin: '16px auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appColors.general.gray.light,
      cursor: 'pointer',
      '& > div': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        borderRadius: '50%',
        cursor: 'pointer',
      },
      '& > span': {
        color: appColors.general.gray.base,
        width: '100%',
        position: 'absolute',
        top: '50%',
        cursor: 'pointer',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      },
      '& input': {
        opacity: 0,
        visibility: 'hidden',
      },
    },
    helperText: {
      color: appColors.general.gray.base,
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: uiConstants.global.zIndex.blocker,
      opacity: 0,
      visibility: 'hidden',
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      '&:before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: uiConstants.global.zIndex.background,
        borderRadius: 20,
        opacity: 0.2,
        backgroundColor: appColors.general.blue.base,
      },
      '&.active': {
        opacity: 1,
        visibility: 'visible',
      },
    },
    modalInner: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: uiConstants.global.zIndex.raisedElement,
      opacity: 0,
      visibility: 'hidden',
      transitionDuration: `${uiConstants.global.animation.speeds.mutation}ms`,
      backgroundColor: appColors.general.white.base,
      maxHeight: `calc(100% - ${uiConstants.modal.margin * 2}px)`,
      borderRadius: 20,
      width: '100%',
      [breakpoints.up('xs')]: {
        maxWidth: '90vw',
        width: '100%',
      },
      [breakpoints.up('md')]: {
        maxWidth: '500px',
        width: '100% !important',
      },
      '&.active': {
        transitionDelay: `${uiConstants.global.animation.speeds.mutation}ms`,
        opacity: 1,
        visibility: 'visible',
      },
    },
    modalHeader: {
      padding: '15px 20px',
      textAlign: 'center',
      borderBottom: `1px solid ${appColors.general.gray.base}`,
      fontSize: 15,
      textTransform: 'uppercase',
    },
    sliderRoot: {
      // margin: "0 15px",
      width: `calc(100% - ${20 * 2 + 40}px)`,
    },
    slider: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      margin: '10px 0',
      '& > div': {
        display: 'block',
        height: 20,
        width: 20,
        position: 'relative',
        '&:before': {
          content: "''",
          display: 'block',
          height: '100%',
          width: '100%',
          position: 'absolute',
          border: `1px solid ${appColors.general.gray.base}`,
          borderRadius: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '&:first-child:before': {
          height: '60%',
          width: '60%',
        },
      },
    },
    controls: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 40px',
      margin: '20px 0 15px',
      '& button:first-child': {
        backgroundColor: appColors.general.gray.background,
      },
      '& button:last-child': {
        color: appColors.general.white.base,
        backgroundColor: brandColors.default.main,
      },
    },
    cropContainer: {
      position: 'relative',
      height: '45vh',
    },
    thumb: {
      height: 20,
      width: 20,
      marginTop: -9,
      marginLeft: -10,
    },
  });

interface OwnProps extends FieldProps, WithStyles<typeof styles> {}

interface ImageCropData {
  height: number;
  width: number;
  x: number;
  y: number;
}

const UploadImageField: React.FC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
    field,
    form: { touched, errors, setFieldValue },
  } = props;
  const error = getIn(touched, field.name) && getIn(errors, field.name);

  const [backupValue, setBackupValue] = useState(field.value);

  const [cropOpen, setCropOpen] = useState<boolean>(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [imageSrc, setImageSrc] = useState<string>(backupValue);

  const [cropData, setCropData] = useState<ImageCropData>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setCropOpen(true);
      setImageSrc(`${imageDataUrl}`);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  };

  const onCancel = () => {
    setFieldValue(field.name, backupValue);
    setCropOpen(false);
  };

  const onConfirm = () => {
    exportCrop();
  };

  const exportCrop = () => {
    const canvas = document.createElement('canvas');
    const image = document.createElement('img');
    image.src = imageSrc;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = cropData.width;
    canvas.height = cropData.height;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
      image,
      cropData.x * scaleX,
      cropData.y * scaleY,
      cropData.width * scaleX,
      cropData.height * scaleY,
      0,
      0,
      cropData.width,
      cropData.height,
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      if (blob) {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setBackupValue(imageSrc);
          setFieldValue(field.name, `${reader.result}`);
          setImageSrc(`${reader.result}`);
          setCropOpen(false);
        };
      }
    });
  };

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels: ImageCropData) => {
      setCropData(croppedAreaPixels);
    },
    [],
  );

  return (
    <section className={classNames(classes.root, error ? classes.error : '')}>
      <div>
        <Typography
          className={classNames(classes.label, error ? 'error' : '  ')}
        >
          Upload the logo or icon of your Ðapp
        </Typography>
        <label className={classes.cta}>
          <span>Choose image</span>
          <div style={{ backgroundImage: `url(${imageSrc})` }} />
          <input type="file" onChange={onFileChange} accept=".jpg, .png" />
        </label>
        <Typography className={classes.helperText}>
          The image should be a square 1:1 ratio JPG or PNG file, minimum size
          is 160 × 160 pixels. The image will be placed in a circle
        </Typography>
      </div>
      {error && (
        <FormHelperText className={classes.errorText} error>
          {error}
        </FormHelperText>
      )}
      <div className={classNames(classes.modal, cropOpen ? 'active' : '')}>
        <div
          className={classNames(classes.modalInner, cropOpen ? 'active' : '')}
        >
          <Typography
            className={classes.modalHeader}
            variant="h3"
            component="p"
          >
            Position and size your image
          </Typography>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              zoomWithScroll={false}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div>
            <section className={classes.slider}>
              <div></div>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom: number) => setZoom(zoom)}
                classes={{ root: classes.sliderRoot, thumb: classes.thumb }}
              />
              <div></div>
            </section>
            <section className={classes.controls}>
              <Button
                size="large"
                variant="contained"
                color="inherit"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={() => onConfirm()}
              >
                Done
              </Button>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withStyles(styles)(UploadImageField);
