import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";
import { FC } from "react";

const PanelContent: FC<BoxProps> = (props) => {
  // @ts-ignore
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("PanelContent", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default PanelContent;
