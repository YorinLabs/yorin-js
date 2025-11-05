import { NextRequest, NextResponse } from 'next/server';
import { Yorin } from 'yorin-nodejs';

// Initialize Yorin with secret key for server-side tracking
const yorin = new Yorin({
  secretKey: process.env.YORIN_SECRET_KEY, // Set this in your .env.local
  debug: true,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, userId, properties, type = 'track', paymentProperties, subscriptionProperties, groupId } = body;

    if (!eventName && !['payment', 'subscription'].includes(type)) {
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

    if (!userId && !properties?.group_id && !groupId) {
      return NextResponse.json({
        error: 'Either userId or group_id (in properties) is required for server events'
      }, { status: 400 });
    }

    switch (type) {
      case 'track':
        await yorin.track(eventName, userId, properties);
        break;

      case 'identify':
        if (!userId) {
          return NextResponse.json({ error: 'userId is required for identify' }, { status: 400 });
        }
        await yorin.identify(userId, properties);
        break;

      case 'group':
        if (!properties?.group_id) {
          return NextResponse.json({ error: 'group_id is required in properties for group events' }, { status: 400 });
        }
        await yorin.group(properties.group_id, userId, properties);
        break;

      case 'page':
        await yorin.page(eventName, userId, properties);
        break;

      case 'payment':
        if (!userId) {
          return NextResponse.json({ error: 'userId is required for payment' }, { status: 400 });
        }
        if (!paymentProperties?.amount || !paymentProperties?.currency) {
          return NextResponse.json({ error: 'amount and currency are required for payment events' }, { status: 400 });
        }
        await yorin.payment(userId, paymentProperties);
        break;

      case 'subscription':
        if (!subscriptionProperties?.plan_id || !subscriptionProperties?.status) {
          return NextResponse.json({ error: 'plan_id and status are required for subscription events' }, { status: 400 });
        }
        await yorin.subscription(subscriptionProperties, { userId, groupId });
        break;

      default:
        return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `${type} event ${eventName ? `"${eventName}"` : ''} tracked successfully`
    });

  } catch (error) {
    console.error('Server-side tracking error:', error);
    return NextResponse.json({
      error: 'Failed to track event',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}