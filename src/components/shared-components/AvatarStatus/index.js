import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "antd";

function getDeterministicColor(letter) {
  const colorMap = {
    A: "#3e79f7",
    B: "#a461d8",
    C: "#04d182",
    D: "#21B573",
    E: "#eb2f96",
    F: "#de4436",
    G: "#fa8c16",
    H: "#fadb14",
    I: "#ff6b72",
    J: "#17bcff",
    K: "#a0d911",
    L: "#ffc542",
    M: "#3e79f7",
    N: "#a461d8",
    O: "#04d182",
    P: "#21B573",
    Q: "#eb2f96",
    R: "#de4436",
    S: "#fa8c16",
    T: "#fadb14",
    U: "#ff6b72",
    V: "#17bcff",
    W: "#a0d911",
    X: "#ffc542",
    Y: "#3e79f7",
    Z: "#a461d8",
  };

  // Convert letter to uppercase to ensure case-insensitivity
  const upperCaseLetter = letter.toUpperCase();

  // If the letter is found in the color map, return its corresponding color
  if (colorMap.hasOwnProperty(upperCaseLetter)) {
    return colorMap[upperCaseLetter];
  } else {
    // If the letter is not found, return a default color
    return "#000000"; // You can choose any default color here
  }
}

const renderAvatar = (props) => {
  const { src, text, type } = props;

  // If src is defined, render the Avatar with the provided src
  if (src) {
    return <Avatar {...props} className={`ant-avatar-${type}`} />;
  }

  // If src is not defined, render the Avatar with the first letter of text and a random background color
  const randomColor = getDeterministicColor(text);
  return (
    <Avatar
      {...props}
      style={{ backgroundColor: randomColor }}
      className={`ant-avatar-${type}`}
    >
      {text && text.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export const AvatarStatus = (props) => {
  const {
    name,
    suffix,
    subTitle,
    id,
    type,
    src,
    icon,
    size,
    shape,
    gap,
    text,
    onNameClick,
  } = props;
  return (
    <div className="avatar-status d-flex align-items-center">
      {renderAvatar({ icon, src, type, size, shape, gap, text })}
      <div className="ml-2">
        <div>
          {onNameClick ? (
            <div
              onClick={() => onNameClick({ name, subTitle, src, id })}
              className="avatar-status-name clickable"
            >
              {name}
            </div>
          ) : (
            <div className="avatar-status-name">{name}</div>
          )}
          <span>{suffix}</span>
        </div>
        <div className="text-muted avatar-status-subtitle">{subTitle}</div>
      </div>
    </div>
  );
};

AvatarStatus.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
  onNameClick: PropTypes.func,
};

export default AvatarStatus;
