import { Image } from 'expo-image';
import { Platform, StyleSheet, NativeEventEmitter } from 'react-native';
import { useEffect } from 'react';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import RNRefiner from 'refiner-react-native';

const RNRefinerEventEmitter = new NativeEventEmitter(RNRefiner);

export default function HomeScreen() {
  useEffect(() => {
    // Check module availability
    if (!RNRefiner) {
      console.warn('RNRefiner module not available');
      return;
    }

    // IMPORTANT: Set up event listeners BEFORE initializing the SDK
    // This prevents the "Sending event with no listeners registered" warnings
    let listeners: any[] = [];

    if (RNRefinerEventEmitter) {
      const beforeShowListener = RNRefinerEventEmitter.addListener(
        'onBeforeShow',
        (event: any) => {
          console.log('onBeforeShow', event.formId);
        }
      );

      const showListener = RNRefinerEventEmitter.addListener(
        'onShow',
        (event: any) => {
          console.log('onShow', event.formId);
        }
      );

      const dismissListener = RNRefinerEventEmitter.addListener(
        'onDismiss',
        (event: any) => {
          console.log('onDismiss', event.formId);
        }
      );

      const closeListener = RNRefinerEventEmitter.addListener(
        'onClose',
        (event: any) => {
          console.log('onClose', event.formId);
        }
      );

      const completeListener = RNRefinerEventEmitter.addListener(
        'onComplete',
        (event: any) => {
          console.log('onComplete', event.formId);
        }
      );

      const errorListener = RNRefinerEventEmitter.addListener(
        'onError',
        (event: any) => {
          console.log('onError', event.message);
        }
      );

      listeners = [
        beforeShowListener,
        showListener,
        dismissListener,
        closeListener,
        completeListener,
        errorListener,
      ];
    }

    try {
      // Initialize the Refiner SDK
      RNRefiner.initialize('56421950-5d32-11ea-9bb4-9f1f1a987a49', true);

      // User traits object
      const userTraits = {
        email: 'expo@test.com',
        platform: 'expo',
        architecture: 'new-arch-test',
      };

      // Identify user
      RNRefiner.identifyUser('expo-user-123', userTraits, null, null, null);

      // Add contextual data
      const contextualData = {
        app: 'expo-refiner',
        screen: 'home',
      };

      RNRefiner.addToResponse(contextualData);

      // Show form
      RNRefiner.showForm('616fc500-5d32-11ea-8fd5-f140dbcb9780', true);

      console.log('Refiner SDK initialized successfully');
    } catch (error) {
      console.error('Error initializing Refiner:', error);
    }

    // Cleanup function
    return () => {
      listeners.forEach(listener => listener.remove());
    };
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Expo + Refiner!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Refiner SDK Test</ThemedText>
        <ThemedText>
          The Refiner SDK has been initialized. Check the console for event logs.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
