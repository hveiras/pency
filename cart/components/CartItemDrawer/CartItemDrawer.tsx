import React from "react";
import {IDrawer, Text, Stack, Flex} from "@chakra-ui/core";
import styled from "@emotion/styled";

import Drawer, {DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Product, Variant} from "~/product/types";
import ProductVariantForm from "~/product/forms/ProductVariantForm";
import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import Button from "~/ui/controls/Button";
import Stepper from "~/ui/inputs/Stepper";
import FormLabel from "~/ui/form/FormLabel";
import TruncatedText from "~/ui/feedback/TruncatedText";
import ToggleableImage from "~/ui/feedback/ToggleableImage";

const BackButton = styled(ArrowLeftIcon)`
  filter: drop-shadow(0px 0px 4px white);
`;

interface Props extends Omit<IDrawer, "children"> {
  onSubmit: (product: Product, options: Variant[], count: number) => void;
  product: Product;
}

const CartItemDrawer: React.FC<Props> = ({onClose, product, onSubmit, ...props}) => {
  const [count, setCount] = React.useState(1);

  function handleSubmit(options: Variant[]) {
    onSubmit(product, options, count);
  }

  function handleReset() {
    setCount(1);
  }

  return (
    <Drawer
      id="cart-item"
      placement="right"
      size="md"
      onAnimationEnd={handleReset}
      onClose={onClose}
      {...props}
    >
      <ProductVariantForm defaultValues={product.options} onSubmit={handleSubmit}>
        {({form, submit, isLoading}) => (
          <>
            <DrawerBody paddingX={0} position="relative">
              <BackButton
                cursor="pointer"
                left={0}
                padding={4}
                position="absolute"
                top={0}
                onClick={onClose}
              />
              {product.image && <ToggleableImage maxHeight="30vh" src={product.image} />}
              <Stack
                shouldWrapChildren
                direction="column"
                flex={1}
                marginTop={product.image ? 0 : 8}
                paddingTop={4}
                paddingX={{base: 4, sm: 12}}
                spacing={6}
              >
                <Stack spacing={2}>
                  <Text fontSize="2xl" fontWeight="bold" lineHeight="normal">
                    {product.title}
                  </Text>
                  <TruncatedText color="gray.500" fontSize="md" limit={280} whiteSpace="pre-line">
                    {product.description}
                  </TruncatedText>
                </Stack>
                {form}
                <Flex alignItems="center" justifyContent="space-between">
                  <FormLabel>Cantidad</FormLabel>
                  <Stepper min={1} value={count} onChange={setCount} />
                </Flex>
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Button
                isFullWidth
                isLoading={isLoading}
                size="lg"
                variantColor="primary"
                onClick={(event) => {
                  event.stopPropagation();

                  submit();
                }}
              >
                Agregar
              </Button>
            </DrawerFooter>
          </>
        )}
      </ProductVariantForm>
    </Drawer>
  );
};

export default CartItemDrawer;