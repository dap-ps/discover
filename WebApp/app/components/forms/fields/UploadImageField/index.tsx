/**
 *
 * UploadButton
 *
 */

import { createStyles, Theme, withStyles, WithStyles, Fab } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import { CloudUpload, Image } from '@material-ui/icons';
import apiUrlBuilder from 'api/apiUrlBuilder';
import { FieldProps, getIn } from 'formik';
import React, { Fragment } from 'react';
import { appColors, brandColors } from 'theme';

interface ThumbProps {
  file: any;
  name: string,
  classes: any,
  disabled: boolean | undefined,
  isSubmitting: boolean | undefined,
}

interface ThumbState {
  loading: boolean;
  thumb?: any;
}

class Thumb extends React.Component<ThumbProps, ThumbState> {
  public state = {
    loading: false,
    thumb: '',
  };

  constructor(props: ThumbProps) {
    super(props);
    const thumb = (typeof(props.file) === 'object') ? URL.createObjectURL(props.file) : apiUrlBuilder.attachmentStream(props.file);
    this.state = {...this.state, thumb: thumb};
  }

  public componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return; }
    if (this.props.file === nextProps.file) { return; }

    const thumb = (typeof(nextProps.file) === 'object') ? URL.createObjectURL(nextProps.file) : apiUrlBuilder.attachmentStream(nextProps.file);
    this.setState({ thumb: thumb });
  }

  public render() {
    const { file, name, classes, disabled, isSubmitting } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return (
        <Fragment>
          <Image className={classes.image} style={{width:"100%", height: "100%"}}/>
          <label htmlFor={name}>
            <Fab component="span" className={classes.imageButton} disabled={disabled || isSubmitting}>
              <CloudUpload />
            </Fab>
          </label>
        </Fragment>
      );
    }

    if (loading) { return <p>loading...</p>; }

    return (
      <Fragment>
        <img src={thumb}
          alt={file.name}
          className="img-thumbnail mt-2"
          width="100%"
          height="100%"
          style={{objectFit: "cover"}}
         >
        </img>
        <label htmlFor={name}>
          <Fab component="span" className={classes.imageButton} disabled={disabled || isSubmitting}>
            <CloudUpload />
          </Fab>
        </label>
      </Fragment>
    );
  }
}

const styles = ({ spacing }: Theme) => createStyles({
  imageButton: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    "&:hover":{
      backgroundColor: brandColors.default.main
    }
  },
  hiddenInput: {
    display: 'none',
  },
  controlRoot:{
    border: `5px solid ${appColors.general.white.base}`,
    height: "20vh", // TODO: Make dynamic
    maxHeight: "300px"
  },
  image: {
    objectFit: "cover",
  }
});

interface OwnProps extends FieldProps, WithStyles<typeof styles> {
  disabled?: boolean;
}

const UploadImageField: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes, field, form: { touched, errors, isSubmitting, setFieldValue, setTouched }, disabled } = props;
  const error = getIn(touched, field.name) && getIn(errors, field.name);

  return (
    <React.Fragment>
      <FormControl className={classes.controlRoot}>
        <Thumb file={field.value} classes={classes} name={field.name} disabled={disabled} isSubmitting={isSubmitting} />
        {error && <FormHelperText error>{error}</FormHelperText>}
        <Input
          error={!!error}
          className={classes.hiddenInput}
          inputProps={{
            id: field.name,
            type: 'file',
            disabled: disabled || isSubmitting,
            name: field.name,
            accept: 'image/*',
            value: '',
            onChange: (event: any) => {
              const file = event.currentTarget.files[0];
              setFieldValue(field.name, file);
              setTouched({ [field.name]: true });
            },
          }}
        />
      </FormControl>
    </React.Fragment>
  );
};

export default withStyles(styles)(UploadImageField);
