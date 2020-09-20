/**
 *
 * CategorySelector
 *
 */

import React, { useState, useRef } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
  FormHelperText,
} from '@material-ui/core';
import { FieldProps, getIn } from 'formik';
import { appColors, uiConstants } from 'theme';
import {
  DAPP_CATEGORY_ICONS,
  DAPP_CATEGORY,
  DAPP_CATEGORY_STRINGS,
} from 'utils/constants';
import classNames from 'classnames';
import DropDownArrowsIcon from '../../../../images/icons/dropdown-arrows.svg';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

let categoryColors = {};
Object.keys(DAPP_CATEGORY_STRINGS).map((key) => {
  categoryColors = {
    ...categoryColors,
    [`&.${key}`]: {
      backgroundColor: appColors.sections[key].base,
    },
  };
});
const styles = ({ palette }: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      position: 'relative',
    },
    internal: {
      position: 'relative',
      margin: '10px 0',
    },
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
    selected: {
      position: 'relative',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,.1), 0 2px 6px rgba(136,122,249,.2)',
      '&.unset': {
        backgroundColor: appColors.general.gray.base,
      },
    },
    options: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 8,
      // height: "100%",
      transitionDuration: `${uiConstants.global.animation.speeds.movement}ms`,
      opacity: 0,
      visibility: 'hidden',
      maxHeight: '0vh',
      boxShadow: '0 2px 8px rgba(0,0,0,.1), 0 2px 6px rgba(136,122,249,.2)',
      zIndex: 99999,
      overflow: 'hidden',
      '&.active': {
        opacity: 1,
        visibility: 'visible',
        maxHeight: '100vh',
      },
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '10px 15px',
      justifyContent: 'space-between',
      color: appColors.general.white.base,
      cursor: 'pointer',
      '& svg': {
        fill: appColors.general.white.base,
        width: 24,
      },
      '& p': {
        flexGrow: 1,
        maxWidth: `calc(100% - ${24 * 2 + 20 * 2}px)`,
      },
      ...categoryColors,
    },
  });

interface OwnProps extends FieldProps, WithStyles<typeof styles> {}

const CategorySelector: React.FC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
    field,
    form: { touched, errors, setFieldValue },
  } = props;
  const error = getIn(touched, field.name) && getIn(errors, field.name);

  const [open, setOpen] = useState<boolean>(false);

  const setCategory = (value: DAPP_CATEGORY) => {
    setFieldValue(field.name, value);
    setOpen(false);
  };

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    if (open) {
      setOpen(false);
    }
  });

  return (
    <section className={classes.root}>
      <Typography className={classNames(classes.label, error ? 'error' : '  ')}>
        Category
      </Typography>
      <div className={classes.internal} ref={ref}>
        <div className={classNames(classes.options, open ? 'active' : '')}>
          {Object.keys(DAPP_CATEGORY_ICONS).map(
            (key: DAPP_CATEGORY, index: number) => (
              <div
                className={classes.item}
                onClick={() => setCategory(key)}
                style={{ backgroundColor: appColors.sections[key].base }}
                key={`cat-selector-${index}`}
              >
                {DAPP_CATEGORY_ICONS[key].minimal({})}
                <Typography>{DAPP_CATEGORY_STRINGS[key]}</Typography>
              </div>
            ),
          )}
        </div>
        <div
          className={classNames(
            classes.item,
            classes.selected,
            appColors.sections[field.value] ? field.value : 'unset',
          )}
          onClick={() => setOpen(true)}
        >
          {appColors.sections[field.value]
            ? DAPP_CATEGORY_ICONS[field.value].minimal({})
            : false}
          <Typography>
            {field.value
              ? DAPP_CATEGORY_STRINGS[field.value]
              : 'Choose category'}
          </Typography>
          <DropDownArrowsIcon />
        </div>
      </div>

      {error && (
        <FormHelperText className={classes.errorText} error>
          {error}
        </FormHelperText>
      )}
    </section>
  );
};

export default withStyles(styles, { withTheme: true })(CategorySelector);
