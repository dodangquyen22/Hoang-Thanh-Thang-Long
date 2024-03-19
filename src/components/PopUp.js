import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import RNModal from "react-native-modal";

type ModalProps = {
    isVisible: boolean;
    children: React.ReactNode;
    [x: string]: any;
};

export const PopUp = ({
    isVisible = false,
    children,
    ...props
}: ModalProps) => {
    return (
        <RNModal
            isVisible={isVisible}
            animationInTiming={1000}
            animationOutTiming={10}
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={10}
            {...props}>
            {children}
        </RNModal>
    );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title }: { title: string }) => (
    <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
    </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
    <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
    <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: "#000",
        borderStyle: "solid",
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        paddingTop: 10,
        textAlign: "center",
        fontSize: 24,
        fontWeight: 'bold',
    },
    body: {
        justifyContent: "center",
        margin: 20,
        minHeight: 20,
    },
    footer: {
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        flexDirection: "row",
    },
});

PopUp.Header = ModalHeader;
PopUp.Container = ModalContainer;
PopUp.Body = ModalBody;
PopUp.Footer = ModalFooter;